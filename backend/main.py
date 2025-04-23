from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Contact(BaseModel):
    id: str
    name: str
    email: str
    company: str
    phone: str
    status: str
    lastContact: str

class Company(BaseModel):
    id: str
    name: str
    industry: str
    website: str
    location: str
    status: str
    contactCount: int

class Deal(BaseModel):
    id: str
    title: str
    company: str
    contactId: str
    value: int
    stage: str
    date: str

import mock_data

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/contacts", response_model=List[Contact])
async def get_contacts():
    return mock_data.CONTACTS_MOCK

@app.get("/companies", response_model=List[Company])
async def get_companies():
    return mock_data.COMPANIES_MOCK

@app.get("/deals", response_model=List[Deal])
async def get_deals():
    return mock_data.DEALS_MOCK
