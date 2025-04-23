from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import companies, contacts, deals

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(companies.router, tags=["Companies"])
app.include_router(contacts.router, tags=["Contacts"])
app.include_router(deals.router, tags=["Deals"])
