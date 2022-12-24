import pandas as pd
from my_types import RequestData


def isFloat(num):
    try:
        float(num)
        return True
    except ValueError:
        return False


def createDataframeForModel(rows_dict):
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
    return df
