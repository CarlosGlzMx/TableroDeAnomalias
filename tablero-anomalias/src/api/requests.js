// GET - Obtiene las cargas y los tableros de la base de dato
export async function getDatosDisponibles(idUsuario) {
    return await fetch(`https://ternium-anomalias.herokuapp.com/datos-disponibles/`, {
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
    return fetch(`https://ternium-anomalias.herokuapp.com/cargas/`, {
        method: "POST",
        headers: {
            id_usuario: idUsuario,
        },
        body: formData,
    }).then((response) => {
        if (response.status === 200) {
            return [
                response.text(),
                response.status,
                response.headers.get("id_nueva"),
            ];
        } else {
            return [response.text(), response.status];
        }
    });
}

// GET - Devuelve la totalidad de datos asociados con una carga
export function getCarga(idUsuario, idCarga) {
    return fetch(`https://ternium-anomalias.herokuapp.com/cargas/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_carga: idCarga,
        },
    }).then((response) => {
        if (response.status === 200) {
            return [
                response.json(),
                response.status,
                {
                    fecha_min: response.headers.get("fecha_min"),
                    fecha_max: response.headers.get("fecha_max"),
                    fecha_inicio: response.headers.get("fecha_inicio"),
                    fecha_fin: response.headers.get("fecha_fin"),
                    filtro_g4: response.headers.get("filtro_g4"),
                    filtro_g5_1: response.headers.get("filtro_g5_1"),
                    filtro_g5_2: response.headers.get("filtro_g5_2"),
                    filtro_g6_1: response.headers.get("filtro_g6_1"),
                    filtro_g6_2: response.headers.get("filtro_g6_2"),
                    umbral_anomalia: response.headers.get("umbral_anomalia"),
                    min_score: response.headers.get("min_score"),
                    max_score: response.headers.get("max_score"),
                },
            ];
        } else {
            return [response.text(), response.status];
        }
    });
}

// DELETE - Borra una carga de la base de datos, incluyendo sus tableros y registros asociados
export function deleteCarga(idUsuario, idCarga) {
    return fetch(`https://ternium-anomalias.herokuapp.com/cargas/`, {
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
export async function postTablero(idUsuario, idCarga, nombre, config) {
    return await fetch(`https://ternium-anomalias.herokuapp.com/tableros/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_carga: idCarga,
            nombre_tablero: nombre,
        },
        body: JSON.stringify(config),
    }).then((response) => {
        if (response.status === 200) {
            return [
                response.text(),
                response.status,
                response.headers.get("id_nueva"),
            ];
        } else {
            return [response.text(), response.status];
        }
    });
}

// GET - Devuelve un tablero guardado previamente
export async function getTablero(idUsuario, idTablero) {
    return await fetch(`https://ternium-anomalias.herokuapp.com/tableros/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            id_usuario: idUsuario,
            id_tablero: idTablero,
        },
    }).then((response) => {
        if (response.status === 200) {
            return [
                response.json(),
                response.status,
                {
                    fecha_min: response.headers.get("fecha_min"),
                    fecha_max: response.headers.get("fecha_max"),
                    fecha_inicio: response.headers.get("fecha_inicio"),
                    fecha_fin: response.headers.get("fecha_fin"),
                    filtro_g4: response.headers.get("filtro_g4"),
                    filtro_g5_1: response.headers.get("filtro_g5_1"),
                    filtro_g5_2: response.headers.get("filtro_g5_2"),
                    filtro_g6_1: response.headers.get("filtro_g6_1"),
                    filtro_g6_2: response.headers.get("filtro_g6_2"),
                    umbral_anomalia: response.headers.get("umbral_anomalia"),
                    min_score: response.headers.get("min_score"),
                    max_score: response.headers.get("max_score"),
                },
            ];
        } else {
            return [response.text(), response.status];
        }
    });
}

// DELETE - Elimina un tablero de la base de datos
export async function deleteTablero(idUsuario, idTablero) {
    return await fetch(`https://ternium-anomalias.herokuapp.com/tableros/`, {
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
