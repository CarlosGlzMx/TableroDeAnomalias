# API para el desarrollo de software - Tablero de Visualización de Anomalías
# Permite la conexión entre la aplicación Web, la base de datos y el modelo de IA
# Desarrollo por el equipo 4 del Tec de Monterrey, Carlos González para Ternium

# Bibliotecas estándar para el manejo del API y los datos
from operator import index
from flask import Flask, make_response, request, render_template, abort, Response, send_file
from flask_cors import CORS, cross_origin
from numpy import dtype
import pandas as pd
import json

# Modulos del equipo de trabajo para seccionamiento de tareas
import model
import processing
import db_manager

app = Flask(__name__)
cors = CORS(app)

# Se numeran las rutas según su orden de uso por la aplicación
# 1 - GET - Ruta por defecto con instrucciones de uso
@app.route("/", methods = ["GET"])
@cross_origin()
def default():
    return render_template("guia.html")

# 3 - GET - Devuelve una lista de nombres y ids de las cargas y tableros disponibles
@app.route("/datos-disponibles/", methods = ["GET"])
@cross_origin()
def list_available_data():
    # Verifica que venga un usuario en la petición
    user_id = request.headers.get("id_usuario")
    if user_id is None or user_id == "undefined":
        return Response("No se ha proporcionado un id de usuario", 400)

    # Busca la lista de nombres de cargas y tableros para este usuario y los devuelve en cuerpo JSON
    try:
        data_names = db_manager.get_data_names(user_id)
        return Response(data_names, 200)
    except Exception as e:
            return Response("Error en la consulta de datos: " + str(e), 500)

# 2 - POST - Carga de nuevos archivos a la base de datos, incluyendo llamar al modelo de IA
# 4 - GET - Devuelve todos los datos asociados con una carga
# 5 - DELETE - Borra una carga de la base de datos, incluyendo sus tableros y registros asociados
@app.route("/cargas/", methods = ["POST", "GET", "DELETE"])
@cross_origin(expose_headers="id_nueva")
def methods_uploads():
    if request.method == "POST":
        # Verifica que venga un usuario y una clasificación de columnas del archivo
        user_id = request.headers.get("id_usuario")
        if user_id is None or user_id == "undefined" or request.form["columnas"] is None or request.form["columnas"] == "undefined":
            return Response("No se ha proporcionado un id de usuario o detallado columnas", 400)
        relevant_columns, AI_columns, date_column = processing.extract_columns(request.form["columnas"])

        # Verifica que venga un archivo y tenga contenidos
        if "archivo_registros" not in request.files or request.files["archivo_registros"].filename == "":
            return Response("No se ha proporcionado un archivo", 400)
       
        # Lee los contenidos del archivo a un df de pandas. Puede tardar un par de minutos
        file_received = request.files["archivo_registros"]
        file_name = file_received.filename

        # Manejo de datos previo al modelo de inteligencia artificial
        if ".csv" in file_name:
            temp_df = pd.read_csv(file_received, encoding='latin-1', low_memory=False)
        else:
            temp_df = pd.read_excel(file_received)
        temp_df = processing.clean(temp_df, date_column)
        try: temp_df = processing.verify_date(temp_df, date_column)
        except Exception as e: return Response("Columna de fechas inadecuada", 500)
        sliced_data = processing.slice_columns(temp_df, relevant_columns + [date_column])
        categorized_data = processing.categorize(sliced_data.copy(), AI_columns)
        resulting_data = model.run_model(categorized_data, sliced_data)

        # Se guardan los datos en la base de datos
        try: new_id = db_manager.save_data(file_name, user_id, resulting_data.copy(), relevant_columns, date_column)
        except Exception as e:
          return Response("Error en el guardado de datos: " + str(e), 500)

        # Regreso de datos
        # Configura la respuesta al sitio web
        response_to_web = Response(resulting_data.to_json() , 200)
        response_to_web.headers["Content-Type"] = "text/csv"
        response_to_web.headers["id_nueva"] = new_id
        return response_to_web
    elif request.method == "GET":
        # Verifica que venga un usuario y un identificador de carga
        user_id = request.headers.get("id_usuario")
        upload_id = request.headers.get("id_carga")
        if user_id is None or user_id == "undefined" or upload_id is None or upload_id == "undefined":
            return Response("No se ha proporcionado un id de usuario o un id de carga", 400)
        
        # Obtiene en un dataframe de Pandas los datos almacenados en la base de datos
        try: headers, rows, info = db_manager.get_data(upload_id, user_id)
        except Exception as e: return Response("Error en la obtención de datos: " + str(e), 500)
        records_df = pd.DataFrame(rows, columns = headers)

        # Configura la respuesta al sitio web
        response_to_web = Response(records_df.to_json(), 200)
        response_to_web.headers["Content-Type"] = "text/csv"
        for key, value in info.items():
            response_to_web.headers[key] = value
        return response_to_web
    elif request.method == "DELETE":
        # Verifica que venga un usuario y un identificador de carga
        user_id = request.headers.get("id_usuario")
        upload_id = request.headers.get("id_carga")
        if user_id is None or user_id == "undefined" or upload_id is None or upload_id == "undefined":
            return Response("No se ha proporcionado un id de usuario o un id de carga", 400)
        try:
            db_manager.delete_data(upload_id, user_id)
            return Response("Carga eliminada correctamente", 200)
        except Exception as e:
            return Response("Error en la eliminación de datos: " + str(e), 500)

# 6 - POST - Guarda una configuración de tablero en la base de datos
# 7 - GET - Devuelve un tablero guardado previamente
# 8 - DELETE - Elimina un tablero de la base de datos
@app.route("/tableros/", methods = ['POST', 'GET', 'DELETE'])
@cross_origin()
def methods_boards():
    if request.method == 'POST':
        # Lee el cuerpo y pasa a un diccionario de Python
        try: parameters = request.get_json()
        except Exception as e: return Response("Error en la lectura del JSON: " + str(e), 500)

        # Verificar que venga un usuario, un id de carga y un nombre de archivo
        parameters["usuario"] = request.headers.get("id_usuario")
        parameters["carga_id"] = request.headers.get("id_carga")
        parameters["nombre"] = request.headers.get("nombre_tablero")
        if parameters["usuario"] is None or parameters["usuario"] == "undefined" or parameters["carga_id"] is None or parameters["carga_id"] == "undefined" or parameters["nombre"] is None or parameters["nombre"] == "undefined":
            return Response("No se ha proporcionado un id de usuario, id de carga o un nombre de tablero", 400)
        
        # Guarda el tablero en la base de datos
        try: db_manager.save_board(parameters)
        except Exception as e: return Response("Error en la base de datos: " + str(e), 500)

        return Response("Tablero guardado correctamente", 200)
    elif request.method == 'GET':
        # Verifica que venga un usuario y un identificador de carga
        user_id = request.headers.get("id_usuario")
        board_id = request.headers.get("id_tablero")
        if user_id is None or user_id == "undefined" or board_id is None or board_id == "undefined":
            return Response("No se ha proporcionado un id de usuario o un id de tablero", 400)
        
        # Obtiene en un dataframe de Pandas los datos almacenados en la base de datos
        try: headers, rows, info = db_manager.get_board(board_id, user_id)
        except Exception as e: return Response("Error en la obtención de datos: " + str(e), 500)
        records_df = pd.DataFrame(rows, columns = headers)

        # Configura la respuesta al sitio web
        response_to_web = Response(records_df.to_csv(index = False), 200)
        response_to_web.headers["Content-Type"] = "text/csv"
        for key, value in info.items():
            response_to_web.headers[key] = value
        return response_to_web
    elif request.method == 'DELETE':
        # Verifica que venga un usuario y un identificador de tablero
        user_id = request.headers.get("id_usuario")
        board_id = request.headers.get("id_tablero")
        if user_id is None or user_id == "undefined" or board_id is None or board_id == "undefined":
            return Response("No se ha proporcionado un id de usuario o un id de tablero", 400)
        try:
            # Borra el tablero de la base de datos y confirma el resultado a la aplicación Web
            db_manager.delete_board(board_id, user_id)
            return Response("Tablero eliminado correctamente", 200)
        except Exception as e:
            return Response("Error en la eliminación del tablero: " + str(e), 500)

if __name__ == "__main__":
    app.run(debug = False)