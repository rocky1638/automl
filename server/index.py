import json
import random
from typing import Dict, List

import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ml import train_model_and_make_prediction
from pydantic import BaseModel
from sklearn import ensemble, linear_model, neural_network


class Data(BaseModel):
    inputs: List[str]
    output: str
    rows: str
    to_predict: Dict[str, float]


class Response(BaseModel):
    prediction: float


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


def isFloat(num):
    try:
        float(num)
        return True
    except ValueError:
        return False


@app.post("/api/train", response_model=Response)
async def train(data: Data):
    rows_dict = json.loads(data.rows)
    # drop rows with missing values
    df = pd.DataFrame.from_dict(rows_dict).dropna()
    types = {}

    # have to assume this data format, because CSV does
    # not inherently store data type information.
    bool_map = {"True": True, "False": False}

    # figure out correct dtypes for each column
    for column in df:
        if isFloat(df[column][0]):
            types[column] = float
        elif str(df[column][0]).lower() in ("true", "false"):
            types[column] = bool
        else:
            types[column] = df[column].dtype

    # convert string booleans to booleans
    for column in types:
        if types[column] == bool:
            df[column] = df[column].map(bool_map)

    # fix df dtypes
    df = df.astype(types)

    prediction = train_model_and_make_prediction(
        df,
        data.output,
        data.inputs,
        data.to_predict
    )
    return Response(prediction=prediction)
