// GET - Obtiene las cargas y los tableros de la base de datos
export async function getCargas(id_usuario) {
    return await fetch(`--Pendiente--/cargas/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "id_usuario": id_usuario,
        },
    }).then((response) => response.json());
}

// POST - Crea una carga en la base de datos
export async function postCarga(archivo) {
    return await fetch(`--Pendiente--/cargas/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "id_usuario": id_usuario,
        },
    }).then((response) => response.json());
}

// GET - Devuelve la totalidad de datos asociados con una carga
export async function postCarga(archivo) {
    return await fetch(`--Pendiente--/cargas/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "id_usuario": id_usuario,
            "id_carga": id_carga,
        },
    }).then((response) => response.json());
}

// Los metodos siguientes son versiones preliminares y estan sujetos a cambios.

// DELETE - Borra una carga de la base de datos, incluyendo sus tableros y registros asociados
export async function deleteCarga(id_usuario, id_carga) {
    return await fetch(`--Pendiente--/cargas/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "id_usuario": id_usuario,
            "id_carga": id_carga,
        },
    }).then((response) => response.json());
}

// POST - Guarda un tablero en la base de datos
export async function postTablero(id_usuario, id_carga, tablero) {
    return await fetch(`--Pendiente--/tableros/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "id_usuario": id_usuario,
            "id_carga": id_carga,
        },
        body: JSON.stringify(tablero),
    }).then((response) => response.json());
}

// GET - Devuelve un tablero guardado previamente
export async function getTablero(id_usuario, id_carga, id_tablero) {
    return await fetch(`--Pendiente--/tableros/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "id_usuario": id_usuario,
            "id_carga": id_carga,
            "id_tablero": id_tablero,
        },
    }).then((response) => response.json());
}

// DELETE - Elimina un tablero de la base de datos
export async function deleteTablero(id_usuario, id_carga, id_tablero) {
    return await fetch(`--Pendiente--/tableros/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "id_usuario": id_usuario,
            "id_carga": id_carga,
            "id_tablero": id_tablero,
        },
    }).then((response) => response.json());
}
