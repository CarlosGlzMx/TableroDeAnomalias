import pandas as pd
from sklearn.preprocessing import LabelEncoder
from pandas.api.types import is_string_dtype

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
def categorize(df):
    for column in df:
        if is_string_dtype(df[column]):
            # Crea la nueva columna con el sufijo num
            df[str(column) + "_num"] = LabelEncoder().fit_transform(df[column])
            df.drop(columns = column, inplace = True)
    return df