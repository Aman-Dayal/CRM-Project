from typing import List
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from models import Deal
from data.mock_data import DEALS_MOCK as deals_data

router = APIRouter(prefix="/deals")

deals: List[Deal] = deals_data

@router.get("/")
async def get_deals():
    return deals

@router.get("/{id}")
async def get_deal(id: str):
    deal = next((deal for deal in deals if deal.id == id), None)
    if deal is None:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal

@router.post("/")
async def create_deal(deal: Deal):
    deal.id = str(len(deals) + 1)
    deals.append(deal)
    return deal

@router.put("/{id}")
async def update_deal(id: str, updated_deal: Deal):
    deal = next((deal for deal in deals if deal.id == id), None)
    if deal is None:
        raise HTTPException(status_code=404, detail="Deal not found")
    for key, value in updated_deal.dict().items():
        setattr(deal, key, value)
    return deal

@router.patch("/{id}")
async def patch_deal(id: str, stage: str, request: Request):
    id = request.path_params["id"]

    deal = next((deal for deal in deals if deal.id == id), None)
    if deal is None:
        raise HTTPException(status_code=404, detail="Deal not found")
    # id = request.path_params["id"]
    deal.stage = stage
    return deal

@router.delete("/{id}")
async def delete_deal(id: str):
    deal = next((deal for deal in deals if deal.id == id), None)
    if deal is None:
        raise HTTPException(status_code=404, detail="Deal not found")
    deals.remove(deal)
    return JSONResponse(status_code=200, content={"message": "Deal deleted successfully"})