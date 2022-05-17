app.config["EXAMPLES"] = "C:/Users/Charlie/source/repos/Web/TableroDeAnomalias/api/examples"

# POST - Carga de nuevos archivos a la base de datos, devolviendo resultados de IA
# GET - Devuelve la totalidad de datos asociados con una carga
# DELETE - Borra una carga de la base de datos, incluyendo sus tableros y registros asociados
@app.route("/cargas/", methods = ["POST", "GET", "DELETE"])
def upload_data():
    if request.method == "POST":
        initial_data = pd.read_excel("examples/uploaded_example.xlsx")
        columns = ["ID", "F_FECHA_INGRESO", "D_UBICACION", "ID_TRANSPORTISTA", "mediana", "weightDifference",
            "FECHA_INS_AUDITORIA", "COMENTARIO_DESCARGA", "COMENTARIO_INSPECCION", "ANOMALY_SCORE"]
        clean_data = processing.clean(initial_data)
        print(clean_data.head())
        sliced_data = processing.slice_columns(clean_data, columns)
        print(sliced_data.head())
        categorized_data = processing.categorize(sliced_data)
        print(categorized_data.head())
        model.run_model(pd.read_csv("examples/clean_data.csv"))
        return Response(json.dumps({"carga_id" : "1"}), 200)


# Devuelve el nuevo id para que el usuario pueda hacer un GET de manera consecutiva
# return Response(json.dumps({"id_carga" : new_id}), 200)
