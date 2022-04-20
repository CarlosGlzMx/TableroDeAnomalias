from sklearn.ensemble import IsolationForest
import pandas as pd

def run_model(df, columns):
    X = df[columns]
    model = IsolationForest().fit(X)
    df['scores'] = model.decision_function(X)
    df['anomaly_score'] = model.predict(X)
    return df

if __name__ == "__main__":
    df = pd.read_csv("examples/clean_data.csv")
    COLS = ["ClaveTransportista_num", "EmpresaTransportista_num", "IdentificacionChofer_num", "NumeroProveedor_num", "UsuarioPermisoCirculacionIngreso_num", "UsuarioEgreso_num", "UsuarioPesadaEntrada_num", "UsuarioControla_num", "UsuarioInsAuditoria_num", "UsuarioInspeccion_num", "UsuarioDescarga_num", "UsuarioPesadaSalida_num"]
    # Limpieza y categorización
    new_df = run_model(df, COLS)
    new_df.to_csv("examples/test_results.csv")