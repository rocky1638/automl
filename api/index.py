import json
from typing import Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ml import train_model_and_make_prediction
from utils import createDataframeForModel
from my_types import RequestData, ResponseData


app = FastAPI()
origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/train", response_model=ResponseData)
async def train(data: RequestData):
    df = createDataframeForModel(json.loads(data.rows))

    prediction = train_model_and_make_prediction(
        df,
        data.output,
        data.inputs,
        data.to_predict
    )
    return ResponseData(prediction=prediction)
