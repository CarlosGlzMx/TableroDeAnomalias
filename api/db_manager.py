import mysql.connector

def db_connect():
    try:
        cnx = mysql.connector.connect(
            user = 'root', password='PASSWORD',
            host='127.0.0.1', database='anomalias'
        )
        cursor = cnx.cursor()
        cursor.execute("SELECT * FROM anomalias.cargas;")
        for row in cursor:
            print(row)
    except mysql.connector.Error as e:
        print("Error: ", e)
    else:
        cnx.close()