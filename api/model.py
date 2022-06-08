from sklearn.ensemble import IsolationForest

# Recibe los datos preparados para correr el modelo artificial
# El resultado lo agrega a los datos preparados para mandarse al App
def run_model(input_df, output_df):
    X = input_df.copy()
    model = IsolationForest().fit(X)
    output_df['scores'] = model.decision_function(X)
    return output_df