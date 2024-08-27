from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
import requests

router = APIRouter()

@router.post("/wishlist/", response_model=schemas.WishlistItem)
def create_wishlist_item(item: schemas.WishlistItemCreate, db: Session = Depends(get_db)):
    return crud.create_wishlist_item(db=db, item=item)

@router.get("/wishlist/", response_model=list[schemas.WishlistItem])
def read_wishlist_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_wishlist_items(db, skip=skip, limit=limit)
    return items

@router.delete("/wishlist/{item_id}", response_model=schemas.WishlistItem)
def delete_wishlist_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.delete_wishlist_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Wishlist item not found")
    return db_item

@router.put("/wishlist/{item_id}", response_model=schemas.WishlistItem)
def update_wishlist_item(item_id: int, item: schemas.WishlistItemCreate, db: Session = Depends(get_db)):
    db_item = crud.update_wishlist_item(db, item_id=item_id, item=item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Wishlist item not found")
    return db_item

@router.get("/search_places/")
def search_places(lat: float, lon: float, radius: int = 200):
    print(lat)
    if not (-90 <= lat <= 90) or not (-180 <= lon <= 180) or radius <= 0:
        raise HTTPException(status_code=400, detail="Invalid parameters")
    
    print(lat)
    overpass_url = "http://overpass-api.de/api/interpreter"
    overpass_query = f"""
    [out:json];
    (
      node["tourism"](around:{radius},{lat},{lon});
    );
    out center;
    """
    print(overpass_query)
    try:
        response = requests.get(overpass_url, params={'data': overpass_query})
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")
    except ValueError:
        raise HTTPException(status_code=500, detail="Invalid response from Overpass API")

