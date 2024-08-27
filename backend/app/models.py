from sqlalchemy import Column, Integer, String, Float, Date, Boolean
from .database import Base

class WishlistItem(Base):
    __tablename__ = "wishlist_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    image_url = Column(String(255), nullable=True)
    location = Column(String(100))
    address = Column(String(255), nullable=True)
    planned_date = Column(Date, nullable=True)
    comment = Column(String(500), nullable=True)
    latitude = Column(Float)
    longitude = Column(Float)
    is_pinned = Column(Boolean, default=True)
