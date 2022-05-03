from sklearn.ensemble import IsolationForest
import pandas as pd

def run_model(df):
    X = df.copy()
    model = IsolationForest().fit(X)
    df['scores'] = model.decision_function(X)
    return df