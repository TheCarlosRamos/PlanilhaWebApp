from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import shutil
import os
from . import db, models, crud, utils

models.Base.metadata.create_all(bind=db.engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db_session = db.SessionLocal()
    try:
        yield db_session
    finally:
        db_session.close()

# Create uploads directory in the project root
UPLOAD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'uploads'))
os.makedirs(UPLOAD_DIR, exist_ok=True)
print(f"Upload directory set to: {UPLOAD_DIR}")  # For debugging

@app.post('/upload')
async def upload_excel(file: UploadFile = File(...), database: Session = Depends(get_db)):
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail='Only Excel files are accepted')
    path = os.path.join(UPLOAD_DIR, file.filename)
    with open(path, 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
    records = utils.excel_to_records(path)
    crud.clear_records(database)
    for r in records:
        crud.create_record(database, r)
    up = crud.create_upload(database, file.filename, {'rows': len(records)})
    return {"id": up.id, "filename": up.filename, "uploaded_at": up.uploaded_at.isoformat(), "meta": up.meta}

@app.get('/records')
def get_records(skip: int = 0, limit: int = 100, q: str = None, database: Session = Depends(get_db)):
    recs = crud.list_records(database, skip=skip, limit=limit, q=q)
    out = []
    for r in recs:
        out.append({
            "id": r.id,
            "row_number": r.row_number,
            "data": r.data,
            "link": r.link,
            "created_at": r.created_at.isoformat()
        })
    return out

@app.get('/records/{id}')
def get_record(id: int, database: Session = Depends(get_db)):
    r = crud.get_record(database, id)
    if not r:
        raise HTTPException(status_code=404, detail='Not found')
    return {
        "id": r.id,
        "row_number": r.row_number,
        "data": r.data,
        "link": r.link,
        "created_at": r.created_at.isoformat()
    }
