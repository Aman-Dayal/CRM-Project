from typing import List

from fastapi import APIRouter

from models import Deal, DealCreate
from data.mock_data import DEALS_MOCK as deals
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/deals", response_model=List[Deal])
async def list_deals():
    return deals

@router.post("/deals", response_model=Deal)
async def create_deal(deal: DealCreate):
    deal_id = str(len(deals) + 1)
    new_deal = Deal(id=deal_id, **deal.dict())
    deals.append(new_deal)
    return new_deal

@router.get("/deals/{id}", response_model=Deal)
async def get_deal(id: str):
    deal = next((d for d in deals if d.id == id), None)
    if deal is None:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal

@router.put("/deals/{id}", response_model=Deal)
async def update_deal(id: str, deal: DealCreate):
    for index, d in enumerate(deals):
        if d.id == id:
            deals[index] = Deal(id=id, **deal.dict())
            return deals[index]
    raise HTTPException(status_code=404, detail="Deal not found")

@router.delete("/deals/{id}")
async def delete_deal(id: str):
    for index, d in enumerate(deals):
        if d.id == id:
            del deals[index]
            return {"message": "Deal deleted"}
    raise HTTPException(status_code=404, detail="Deal not found")