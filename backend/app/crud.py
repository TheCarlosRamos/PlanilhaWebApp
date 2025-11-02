from sqlalchemy.orm import Session
from . import models
from sqlalchemy import String
import json

def clear_records(db: Session):
    db.query(models.Record).delete()
    db.commit()

def create_record(db: Session, record):
    db_rec = models.Record(row_number=record['row_number'], data=record['data'], link=record.get('link'))
    db.add(db_rec)
    db.commit()
    db.refresh(db_rec)
    return db_rec

def create_upload(db: Session, filename: str, meta: dict):
    up = models.Upload(filename=filename, meta=meta)
    db.add(up)
    db.commit()
    db.refresh(up)
    return up

def list_records(db: Session, skip: int = 0, limit: int = 100, q: str = None):
    query = db.query(models.Record).order_by(models.Record.id.desc())
    if q:
        # simple text search on JSON serialized
        query = query.filter(models.Record.data.cast(String).ilike(f"%{q}%"))
    return query.offset(skip).limit(limit).all()

def get_record(db: Session, record_id: int):
    return db.query(models.Record).filter(models.Record.id == record_id).first()
