from typing import List

from fastapi import APIRouter

from models import Company
from data.mock_data import COMPANIES_MOCK as companies
from models import CompanyCreate
from fastapi import HTTPException

router = APIRouter()

@router.get("/companies", response_model=List[Company])
async def list_companies():
    try:
        return companies
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/companies", response_model=Company)
async def create_company(company: CompanyCreate):
    try:
        company_id = str(len(companies) + 1)
        new_company = Company(id=company_id, **company.dict(), contactCount=0)
        companies.append(new_company)
        return new_company
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/companies/{id}", response_model=Company)
async def get_company(id: str):
    try:
        company = next((c for c in companies if c.id == id), None)
        if company is None:
            raise HTTPException(status_code=404, detail="Company not found")
        return company
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/companies/{id}", response_model=Company)
async def update_company(id: str, company: CompanyCreate):
    try:
        for index, c in enumerate(companies):
            if c.id == id:
                companies[index] = Company(id=id, **company.dict(), contactCount=c.contactCount)
                return companies[index]
        raise HTTPException(status_code=404, detail="Company not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/companies/{id}")
async def delete_company(id: str):
    try:
        for index, c in enumerate(companies):
            if c.id == id:
                del companies[index]
                return {"message": "Company deleted"}
        raise HTTPException(status_code=404, detail="Company not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))