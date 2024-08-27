from pydantic import BaseModel
from typing import Optional
from datetime import date

class WishlistItemBase(BaseModel):
    name: str
    image_url: Optional[str] = None
    location: str
    address: Optional[str] = None
    planned_date: Optional[date] = None
    comment: Optional[str] = None
    latitude: float
    longitude: float
    is_pinned: bool = True

class WishlistItemCreate(WishlistItemBase):
    pass

class WishlistItem(WishlistItemBase):
    id: int

    class Config:
        orm_mode = True
