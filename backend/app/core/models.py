from typing import List, Dict
from pydantic import BaseModel, Field
import uuid


class Alternative(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str


class Criterion(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str


class ExpertInput(BaseModel):
    expert_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    criterion_weights: Dict[str, float]
    criterion_scores: Dict[str, Dict[str, float]]


class DecisionModelCreate(BaseModel):
    name: str
    alternatives: List[str]
    criteria: List[str]


class DecisionModel(BaseModel):
    model_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    alternatives: List[Alternative]
    criteria: List[Criterion]
    expert_inputs: List[ExpertInput] = Field(default_factory=list)


class Ranking(BaseModel):
    average_criteria_weights: Dict[str, float]
    aggregated_decision_matrix: Dict[str, Dict[str, float]]
    closeness_scores: Dict[str, float]
    ranking: List[str]
