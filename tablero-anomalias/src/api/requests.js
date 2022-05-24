// GET - Obtiene las cargas y los tableros de la base de datos
export async function getDatosDisponibles(idUsuario) {
    return await fetch(`http://127.0.0.1:5000/datos-disponibles/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario.user,
        },
    }).then((response) => response.json());
}

// POST - Crea una carga en la base de datos
export function postCarga(archivo, columnas, idUsuario) {
    const formData = new FormData();
    formData.append("archivo_registros", archivo);
    formData.append("columnas", JSON.stringify(columnas));
    return fetch(`http://127.0.0.1:5000/cargas/`, {
        method: "POST",
        headers: {
            id_usuario: idUsuario.user,
        },
        body: formData,
    }).then((response) =>
        response.json().then((data) => ({
            datos: { ...data },
            idNuevo: response.headers.get("id_nueva"),
        }))
    );
}

// GET - Devuelve la totalidad de datos asociados con una carga
export function getCarga(archivo, idUsuario, idCarga) {
    return fetch(`http://127.0.0.1:5000/cargas/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario.user,
            id_carga: idCarga,
        },
    }).then((response) => response.json());
}

// DELETE - Borra una carga de la base de datos, incluyendo sus tableros y registros asociados
export async function deleteCarga(idUsuario, idCarga) {
    return await fetch(`http://127.0.0.1:5000/cargas/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_carga: idCarga,
        },
    }).then((response) => response.json());
}

// POST - Guarda un tablero en la base de datos
export async function postTablero(idUsuario, idCarga, tablero) {
    return await fetch(`http://127.0.0.1:5000/tableros/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_carga: idCarga,
        },
        body: JSON.stringify(tablero),
    }).then((response) => response.json());
}

// GET - Devuelve un tablero guardado previamente
export async function getTablero(idUsuario, idCarga, idTablero) {
    return await fetch(`http://127.0.0.1:5000/tableros/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_carga: idCarga,
            id_tablero: idTablero,
        },
    }).then((response) => response.json());
}

// DELETE - Elimina un tablero de la base de datos
export async function deleteTablero(idUsuario, idCarga, idTablero) {
    return await fetch(`http://127.0.0.1:5000/tableros/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_carga: idCarga,
            id_tablero: idTablero,
        },
    }).then((response) => response.json());
}
