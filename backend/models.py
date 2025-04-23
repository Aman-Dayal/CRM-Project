from typing import List, Dict, Any
from pydantic import BaseModel

class Company(BaseModel):
    id: str
    name: str
    industry: str
    website: str
    location: str
    status: str
    contactCount: int

class CompanyCreate(BaseModel):
    name: str
    industry: str
    website: str
    location: str
    status: str

class Deal(BaseModel):
    id: str
    title: str
    company: str
    stage: str
    value: float
    date: str
    contactId: str

class DealCreate(BaseModel):
    name: str
    stage: str
    amount: float
    closeDate: str
    contact: str
    contactID: str
    contactID: str

class Contact(BaseModel):
    id: str
    name: str
    email: str
    company: str
    phone: str
    status: str
    lastContact: str

class ContactCreate(BaseModel):
    name: str
    email: str
    company: str
    phone: str
    status: str