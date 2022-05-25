from sklearn.preprocessing import LabelEncoder
import datetime
import json

import pandas as pd
from pandas.api.types import is_string_dtype
pd.options.mode.chained_assignment = None

# Limpia del documento subido las columnas de datos inadecuadas
def clean(df):
    for column in df:
        # Eliminación de columnas elegidas como innecesarias o redundantes
        if "anomaly" in column.lower() or "score" in column.lower() or "id" == column.lower():
            df.drop(columns = column, inplace = True)
        # Reemplazo de valores vacíos por un valor común
        elif df[column].isna().sum() > 0:
            if "fecha" in column.lower():
                df[column] = df[column].fillna(df[column].mode())
            else:
                df[column] = df[column].fillna("NA")
    return df

# Elimina las columnas no requeridas para el modelo de Inteligencia Artificial
def slice_columns(df, columns_kept):
    df = df[df.columns[df.columns.isin(columns_kept)]]
    return df

# Convierte datos en formatos no numéricos en datos numericos
def categorize(df, AI_columns):
    for column in df:
        if column in AI_columns:
            if is_string_dtype(df[column]):
                # Crea la nueva columna con el sufijo num
                df[str(column) + "_IA"] = LabelEncoder().fit_transform(df[column])
                df.drop(columns = column, inplace = True)
        else:
            df.drop(columns = column, inplace = True)
    return df

# Extrae de un JSON recibido desde el app las columnas con sus características
def extract_columns(columns_text):
    # Procesa una cadena JSON a un objeto de Python y lo itera
    columns_list = json.loads(columns_text)
    relevant_columns, AI_columns, date_column = [], [], []
    for column in columns_list:
        name = next(iter(column))
        # Las columnas que utilizará el modelo las definió el usuario
        if column[name]["ia"] == "true":
            AI_columns.append(name)
        # También definió sus columnas de interés (Agentes internos y externos)
        if column[name]["column_type"] in ["A-I", "A-E", "D-I"]:
            relevant_columns.append(name)
        # La fecha es incluída de igual manera, pues el app la necesita
        if column[name]["date"] == "true":
            date_column = name
    return relevant_columns, AI_columns, date_column

# Verifica que la columna de fechas sea adecuada para guardarse en la base de datos
def verify_date(df, date_column):
    df[date_column] = pd.to_datetime(df[date_column]).dt.strftime("%Y-%m-%d")
    return df