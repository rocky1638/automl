from pydantic import BaseModel
from typing import List, Dict


class RequestData(BaseModel):
    inputs: List[str]
    output: str
    rows: str
    to_predict: Dict[str, float]


class ResponseData(BaseModel):
    prediction: float
