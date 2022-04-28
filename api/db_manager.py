import mysql.connector
import json 

# Crea una conexión con una base de datos local de MySQL
def db_connect():
    try:
        return mysql.connector.connect(
            user = 'root', password='G4yylh&h!miyec2a',
            host='127.0.0.1', database='ternium_anomalias'
        )
    except mysql.connector.Error as e:
        print("Error: ", e)
    else:
        cnx.close()

# Devuelve un archivo JSON enlistando los nombres y id de las cargas y tableros disponibles en la BD
def get_data_names(user_id):
    try:
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
    except Exception as e:
        # Impresión genérica de errores
        print("Error: ", e)

# Devuelve todos los registros de una carga, e información de la corrida de AI, según ids
def get_upload(upload_id, user_id):
    try:
        # Conecta a la base de datos y crea un cursor
        cnx = db_connect()
        cursor = cnx.cursor()

        # Ejecuta el stored procedure de MySQL que busca la carga
        cursor.callproc("obtiene_carga", (upload_id, user_id))
        cursor.close()
        cnx.close()
        return "aaa"
    except Exception as e:
        # Impresión genérica de errores
        print("Error: ", e)
