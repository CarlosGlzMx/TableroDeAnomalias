# Bibliotecas estándar para el manejo del API y los datos
from flask import Flask, request, render_template, abort, Response, jsonify, send_from_directory
import pandas as pd
import json

# Modulos del equipo de trabajo para seccionamiento de tareas
import model
import processing
import db_manager

app = Flask(__name__)

app.config["EXAMPLES"] = "C:/Users/Charlie/source/repos/Web/TableroDeAnomalias/api/examples"

# Ruta por defecto con instrucciones de uso
@app.route("/")
def default():
    return render_template("map.html")

# GET - Devuelve una lista de nombres y ids de las cargas y tableros disponibles
@app.route("/datos-disponibles/", methods = ["GET"])
def list_available_data():
    # Verifica que venga un usuario en la petición
    user_id = request.headers.get("id_usuario")
    if user_id is None: return Response("No se ha proporcionado un id de usuario", 400)

    # Busca la lista de nombres de cargas y tableros para este usuario
    data_names = db_manager.get_data_names(user_id)
    return Response(data_names, 200)

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
    elif request.method == "GET":
        # Verifica que vengan un usuario y un identificador de carga en la petición
        upload_id = request.headers.get("id_carga")
        user_id = request.headers.get("id_usuario")
        if upload_id is None or user_id is None:
            return Response("No se ha proporcionado un id de carga o de usuario", 400)
        return send_from_directory(app.config["EXAMPLES"], path = "model_result.csv", as_attachment = True)

        # Busca la carga en la base de datos
        # data = db_manager.get_upload(upload_id, user_id)
        # return Response(data, 200)
    elif request.method == "DELETE":
        return "delete"

# POST - Guarda un tablero en la base de datos
# GET - Devuelve un tablero guardado previamente
# DELETE - Elimina un tablero de la base de datos
@app.route("/tableros", methods = ['POST', 'GET', 'DELETE'])
def modify_board():
    if request.method == 'POST':
        # Verificar que venga un objeto con configuración, así como un usuario
        # Guardar tal tablero en la base de datos
        # Responder positivo si se guarda exitosamente
        # Responder un error si surge algún problema
        print("tablero guardado")
        return "tablero guardado"
    elif request.method == 'GET':
        # Verificar que venga un usuario y un id de tablero
        # Buscar tal tablero en la base de datos
        # Devolver los datos asociados con este tablero y positivo si todo sale bien
        # Responder un error si surge algún problema
        print("tablero consultado")
        return "tablero consultado"
    elif request.method == 'DELETE':
        # Verificar que venga un usuario y un id de tablero
        # Buscar tal tablero en la base de datos
        # Borrar el tablero y devolver positivo si todo sale bien
        # Responder un error si surge algún problema
        print("tablero borrado")
        return "tablero borrado"

if __name__ == "__main__":
    app.run(debug = False)