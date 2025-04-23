from typing import List

from fastapi import APIRouter

from models import Contact
from data.mock_data import CONTACTS_MOCK as contacts
from models import ContactCreate
from fastapi import HTTPException

router = APIRouter()

@router.get("/contacts", response_model=List[Contact])
async def list_contacts():
    return contacts

@router.post("/contacts", response_model=Contact)
async def create_contact(contact: ContactCreate):
    contact_id = str(len(contacts) + 1)
    new_contact = Contact(id=contact_id, **contact.dict(), lastContact="")
    contacts.append(new_contact)
    return new_contact

@router.get("/contacts/{id}", response_model=Contact)
async def get_contact(id: str):
    contact = next((c for c in contacts if c.id == id), None)
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@router.put("/contacts/{id}", response_model=Contact)
async def update_contact(id: str, contact: ContactCreate):
    for index, c in enumerate(contacts):
        if c.id == id:
            contacts[index] = Contact(id=id, **contact.dict(), lastContact=c.lastContact)
            return contacts[index]
    raise HTTPException(status_code=404, detail="Contact not found")

@router.delete("/contacts/{id}")
async def delete_contact(id: str):
    for index, c in enumerate(contacts):
        if c.id == id:
            del contacts[index]
            return {"message": "Contact deleted"}
    raise HTTPException(status_code=404, detail="Contact not found")