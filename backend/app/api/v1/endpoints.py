from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import Dict
from pydantic import ValidationError
from app.core.models import DecisionModel, DecisionModelCreate, ExpertInput, Alternative, Criterion, Ranking
from helpers import resp
from app.core.services import calculate_topsis
import json
import uuid

router = APIRouter()

# In-memory storage for decision models
decision_models: Dict[str, DecisionModel] = {}


@router.get("/models/", response_model=list[DecisionModel])
def get_decision_model():
    return resp.success([model.dict() for model in decision_models.values()])


@router.get("/models/{model_id}", response_model=DecisionModel)
def get_decision_model_by_id(model_id: str):
    if model_id not in decision_models:
        raise HTTPException(status_code=404, detail="Model not found")
    return resp.success(decision_models[model_id].dict())


@router.post("/models/", response_model=DecisionModel)
def create_decision_model(model_data: DecisionModelCreate):
    new_model_id = str(uuid.uuid4())
    alternatives = [Alternative(name=name) for name in model_data.alternatives]
    criteria = [Criterion(name=name) for name in model_data.criteria]

    if len(alternatives) < 2:
        raise HTTPException(status_code=422, detail="Cannot create model with fewer than 2 alternatives")
    if len(criteria) == 0:
        raise HTTPException(status_code=422, detail="Cannot create model without criteria")

    model = DecisionModel(
        model_id=new_model_id,
        name=model_data.name,
        alternatives=alternatives,
        criteria=criteria
    )

    decision_models[model.model_id] = model
    return resp.success(model.dict())


@router.delete("/models/{model_id}", response_model=DecisionModel)
def delete_decision_model(model_id: str):
    model = decision_models.pop(model_id, None)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    return resp.success(model.dict())


@router.post("/models/{model_id}/experts/", response_model=DecisionModel)
def submit_expert_input(model_id: str, expert_input: ExpertInput):
    model = decision_models.get(model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    model.expert_inputs.append(expert_input)
    return resp.success(model.dict())


@router.post("/models/import/", response_model=DecisionModel)
async def import_model(file: UploadFile = File(...)):
    try:
        content = await file.read()
        data = json.loads(content)
        model = DecisionModel(**data)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON file")
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=e.errors())

    if model.model_id in decision_models:
        raise HTTPException(status_code=400, detail="Model ID already exists")
    decision_models[model.model_id] = model
    return resp.success(model.dict())


@router.get("/models/{model_id}/export/", response_model=DecisionModel)
def export_model(model_id: str):
    model = decision_models.get(model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    return resp.success(model.dict())


@router.get("/models/{model_id}/rankings/", response_model=Ranking)
def calculate_rankings(model_id: str):
    model = decision_models.get(model_id)
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    ranking_result = calculate_topsis(model)
    return resp.success(ranking_result.dict())
