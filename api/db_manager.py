import mysql.connector
import pandas as pd
import json

# Constantes de desarrollo - Cambian por cada computadora
DB_USER = "root"
DB_PWD = "G4yylh&h!miyec2a"
DB_IP = "127.0.0.1"
DB_NAME = "ternium_anomalias"

# Crea una conexión con una base de datos local de MySQL
def db_connect():
    return mysql.connector.connect(
        user = DB_USER, password = DB_PWD,
        host = DB_IP, database = DB_NAME)

# Devuelve un archivo JSON enlistando los nombres y id de las cargas y tableros disponibles en la BD
def get_data_names(user_id):
    # Conecta a la base de datos y crea un cursor
    cnx = db_connect()
    cursor = cnx.cursor()

    # Ejecuta el stored procedure de MySQL que busca la información del user_id
    cursor.callproc("enlista_cargas_y_tableros", (user_id,))

    # Genera listas de objetos con los resultados almacenados, sin los formatos de tupla
    for i, result in enumerate(cursor.stored_results()):
        if i == 0:
            upload_list = [{"id" : row[0], "nombre" : row[1]} for row in result.fetchall()]
        elif i == 1:
            board_list = [{"id" : row[0], "nombre" : row[1]} for row in result.fetchall()]
    # Cierra cursores y conexión como buena práctica
    cursor.close()
    cnx.close()
    return json.dumps({"cargas" : upload_list, "tableros" : board_list})

# Llama a un Stored Procedure que guarda una nueva carga, como objeto y como agregración de registros
def save_data(upload_name, user_id, df, base_columns, date_column):
    # Conecta a la base de datos y crea un cursor
    cnx = db_connect()
    cursor = cnx.cursor()

    # Ejecuta el stored procedure de MySQL que guarda la carga
    cursor.callproc("crea_carga", (user_id, upload_name, ",".join(base_columns)))
    created_id = next(cursor.stored_results()).fetchall()[0][0]

    # Prepara el formato de cada registro y lo guarda con un stored procedure
    df["variables"] = df[base_columns].astype(str).agg(",".join, axis = 1)
    for index, row in df.iterrows():
        row[date_column] = None if row[date_column] == "2000-01-01" else row[date_column]
        cursor.callproc("crea_registro", (created_id, index, row[date_column], row["scores"], row["variables"]))

    # Guarda todos las inserciones
    cnx.commit()
    cursor.close()
    cnx.close()
    return created_id

# Llama a un Stored Procedure que devuelve los registros de una carga en un dataframe, junto con info adicional
def get_data(upload_id, user_id):
    # Conecta a la base de datos y crea un cursor
    cnx = db_connect()
    cursor = cnx.cursor()

    # Ejecuta el stored procedure de MySQL que busca la carga
    cursor.callproc("obtiene_carga", (upload_id, user_id))

    # Genera listas de objetos con los resultados almacenados, sin los formatos de tupla
    for i, result in enumerate(cursor.stored_results()):
        # Primer resultado esperado: Encabezados
        if i == 0:
            headers = result.fetchall()[0][0].split(",")
        # Segundo resultado esperado: Registros separados por comas
        elif i == 1:
            rows = [row[0].split(",") for row in result.fetchall()]
        # Tercer resultado esperado: Información adicional
        elif i == 2:
            info_list = result.fetchall()[0]
            info = {"fecha_inicio" : info_list[0], "fecha_fin" : info_list[1]}
    cursor.close()
    cnx.close()
    return headers, rows, info

# Llama a un Stored Procedure que borra una carga junto con todos sus tableros asociados
def delete_data(upload_id, user_id):
    # Conecta a la base de datos y crea un cursor
    cnx = db_connect()
    cursor = cnx.cursor()

    # Ejecuta el stored procedure de MySQL que borra la carga
    cursor.callproc("borra_carga", (upload_id, user_id))
    cnx.commit()
    cursor.close()
    cnx.close()

# Llama a un Stored Procedure que guarda la configuración de un tablero
def save_board(parameters):
    # Conecta a la base de datos y crea un cursor
    cnx = db_connect()
    cursor = cnx.cursor()

    # Verifica que se hayan incluido todos los parametros
    cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'tableros';")
    expected_columns = [row[0] for row in cursor.fetchall()]
    if len(parameters) + 2 != len(expected_columns):
        raise Exception("No se proveen todos los filtros de tableros")
    for column_name in expected_columns:
        if column_name not in parameters and column_name not in ["id", "fecha_creacion"]:
            raise Exception ("Columna no encontrada: " + str(column_name))
    sorted_keys = sorted(parameters.keys(), key = lambda column_name: column_name.lower())
    sorted_params = tuple(parameters[key] for key in sorted_keys)

    # Ejecuta el stored procedure de MySQL que borra la carga
    cursor.callproc("guarda_tablero", sorted_params)
    cnx.commit()
    cursor.close()
    cnx.close()

# Llama a un Stored Procedure que devuelve un tablero, que es una carga más parámetros de configuración
def get_board(board, user_id):
    # Conecta a la base de datos y crea un cursor
    cnx = db_connect()
    cursor = cnx.cursor()

    # Ejecuta el stored procedure de MySQL que busca la carga
    cursor.callproc("obtiene_tablero", (board, user_id))

    # Genera listas de objetos con los resultados almacenados, sin los formatos de tupla
    for i, result in enumerate(cursor.stored_results()):
        # Primer resultado esperado: Encabezados
        if i == 0:
            headers = result.fetchall()[0][0].split(",")
        # Segundo resultado esperado: Registros separados por comas
        elif i == 1:
            rows = [row[0].split(",") for row in result.fetchall()]
        # Tercer resultado esperado: Información adicional
        elif i == 2:
            info = {key : value for key, value in zip(result.column_names, result.fetchall()[0])}
    cursor.close()
    cnx.close()
    return headers, rows, info

# Llama a un Stored Procedure que borra un solo tablero, su configuración, y no los datos de la carga
def delete_board(board_id, user_id):
    # Conecta a la base de datos y crea un cursor
    cnx = db_connect()
    cursor = cnx.cursor()

    # Ejecuta el stored procedure de MySQL que borra la carga
    cursor.callproc("borra_tablero", (board_id, user_id))
    cnx.commit()
    cursor.close()
    cnx.close()