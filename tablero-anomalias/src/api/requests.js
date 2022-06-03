// GET - Obtiene las cargas y los tableros de la base de dato
export async function getDatosDisponibles(idUsuario) {
    return await fetch(`http://127.0.0.1:5000/datos-disponibles/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
        },
    }).then((response) => {
        if (response.status === 200) {
            return [response.json(), response.status];
        } else {
            return [response.text(), response.status];
        }
    });
}

// POST - Crea una carga en la base de datos
export function postCarga(archivo, columnas, idUsuario) {
    const formData = new FormData();
    formData.append("archivo_registros", archivo);
    formData.append("columnas", JSON.stringify(columnas));
    return fetch(`http://127.0.0.1:5000/cargas/`, {
        method: "POST",
        headers: {
            id_usuario: idUsuario,
        },
        body: formData,
    }).then((response) => {
        if (response.status === 200) {
            return [
                response.json().then((data) => ({
                    datos: { ...data },
                    idNuevo: response.headers.get("id_nueva"),
                })),
                response.status,
            ];
        } else {
            return [response.text(), response.status];
        }
    });
}

// GET - Devuelve la totalidad de datos asociados con una carga
export function getCarga(idUsuario, idCarga) {
    return fetch(`http://127.0.0.1:5000/cargas/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_carga: idCarga,
        },
    }).then((response) => {
        if (response.status === 200) {
            return [response.json(), response.status];
        } else {
            return [response.text(), response.status];
        }
    });
}

// DELETE - Borra una carga de la base de datos, incluyendo sus tableros y registros asociados
export function deleteCarga(idUsuario, idCarga) {
    return fetch(`http://127.0.0.1:5000/cargas/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_carga: idCarga,
        },
    }).then((response) => {
        if (response.status === 200) {
            return [response.text(), response.status];
        } else {
            return [response.text(), response.status];
        }
    });
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
export async function getTablero(idUsuario, idTablero) {
    return await fetch(`http://127.0.0.1:5000/tableros/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_tablero: idTablero,
        },
    }).then((response) => response.json());
}

// DELETE - Elimina un tablero de la base de datos
export async function deleteTablero(idUsuario, idTablero) {
    return await fetch(`http://127.0.0.1:5000/tableros/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_tablero: idTablero,
        },
    }).then((response) => {
        if (response.status === 200) {
            return [response.text(), response.status];
        } else {
            return [response.text(), response.status];
        }
    });
}
