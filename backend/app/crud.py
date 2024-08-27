from sqlalchemy.orm import Session
from . import models, schemas

def create_wishlist_item(db: Session, item: schemas.WishlistItemCreate):
    db_item = models.WishlistItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_wishlist_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.WishlistItem).offset(skip).limit(limit).all()

def delete_wishlist_item(db: Session, item_id: int):
    item = db.query(models.WishlistItem).filter(models.WishlistItem.id == item_id).first()
    if item:
        db.delete(item)
        db.commit()
    return item

def update_wishlist_item(db: Session, item_id: int, item: schemas.WishlistItemCreate):
    db_item = db.query(models.WishlistItem).filter(models.WishlistItem.id == item_id).first()
    if db_item:
        for key, value in item.dict().items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item
