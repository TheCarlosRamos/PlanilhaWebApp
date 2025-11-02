from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class RecordBase(BaseModel):
    row_number: Optional[int]
    data: Dict[str, Any]
    link: Optional[str]

class RecordCreate(RecordBase):
    pass

class RecordOut(RecordBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class UploadOut(BaseModel):
    id: int
    filename: str
    uploaded_at: datetime
    meta: Optional[Dict[str, Any]]
    class Config:
        orm_mode = True
