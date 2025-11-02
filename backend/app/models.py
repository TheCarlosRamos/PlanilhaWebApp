from sqlalchemy import Column, Integer, String, DateTime, JSON, Text
from sqlalchemy.sql import func
from .db import Base

class Record(Base):
    __tablename__ = 'records'
    id = Column(Integer, primary_key=True, index=True)
    row_number = Column(Integer, nullable=True)
    data = Column(JSON, nullable=False)
    link = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Upload(Base):
    __tablename__ = 'uploads'
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    meta = Column(JSON, nullable=True)
