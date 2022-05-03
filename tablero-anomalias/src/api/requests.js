// GET - Obtiene las cargas y los tableros de la base de datos
export async function getCargas(idUsuario) {
	return await fetch(`--Pendiente--/cargas/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"id_usuario": idUsuario,
		},
	}).then((response) => response.json());
}
	
// POST - Crea una carga en la base de datos
export async function postCarga(archivo, idUsuario) {
	return await fetch(`--Pendiente--/cargas/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"id_usuario": idUsuario,
		},
	}).then((response) => response.json());
}

// GET - Devuelve la totalidad de datos asociados con una carga
export async function postCarga(archivo, idUsuario, idCarga) {
	return await fetch(`--Pendiente--/cargas/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"id_usuario": idUsuario,
			"id_carga": idCarga,
		},
	}).then((response) => response.json());
}

// Los metodos siguientes son versiones preliminares y estan sujetos a cambios.

// DELETE - Borra una carga de la base de datos, incluyendo sus tableros y registros asociados
export async function deleteCarga(idUsuario, idCarga) {
	return await fetch(`--Pendiente--/cargas/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"id_usuario": idUsuario,
			"id_carga": idCarga,
		},
	}).then((response) => response.json());
}

// POST - Guarda un tablero en la base de datos
export async function postTablero(idUsuario, idCarga, tablero) {
	return await fetch(`--Pendiente--/tableros/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"id_usuario": idUsuario,
			"id_carga": idCarga,
		},
		body: JSON.stringify(tablero),
	}).then((response) => response.json());
}

// GET - Devuelve un tablero guardado previamente
export async function getTablero(idUsuario, idCarga, idTablero) {
	return await fetch(`--Pendiente--/tableros/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"id_usuario": idUsuario,
			"id_carga": idCarga,
			"id_tablero": idTablero,
		},
	}).then((response) => response.json());
}

// DELETE - Elimina un tablero de la base de datos
export async function deleteTablero(idUsuario, idCarga, idTablero) {
	return await fetch(`--Pendiente--/tableros/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"id_usuario": idUsuario,
			"id_carga": idCarga,
			"id_tablero": idTablero,
		},
	}).then((response) => response.json());
}