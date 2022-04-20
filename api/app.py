from flask import Flask, request, render_template
from db_manager import *
app = Flask(__name__)

# Ruta por defecto con instrucciones de uso
@app.route("/")
def default():
    return render_template('map.html')


# Carga de nuevos archivos a la base de datos
# Incluye la llamada al modelo de inteligencia artificial
@app.route("/cargas", methods = ['POST'])
def upload_data():
    # Verificar que venga un usuario y un archivo .csv o .xslx
    # Estandarizar los datos a un solo formato
    # Llamar al modelo de Inteligencia artificial con estos datos
    # Guardar todos los registros con su score a la base de datos
    # Devolver estos datos como un solo tablero, con positivo
    # Mostrar error en caso de algún fallo
    print("datos cargados")
    return "datos cargados"

# Guarda un tablero en la base de datos (POST)
# Devuelve un tablero guardado previamente (GET)
# Elimina un tablero de la base de datos (DELETE)
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
    db_connect()
    app.run(debug = False)