// Reacomoda variables para guardar fecha en texto como en tipo Date()
export function dateParser(datos) {
    if (datos) {
        datos["Fecha"] = {};
        for (var i = 0; i < Object.keys(datos.fecha).length; i++) {
            datos["Fecha"][i] = datos["fecha"][i];
            datos["fecha"][i] = new Date(datos.fecha[i]);
        }
    }
    return datos;
}

// Identifica si una fecha, en cualquier formato (Date o string) está en un rango
export function dateInRange(mainDate, lowDate, highDate) {
    return new Date(mainDate) >= new Date(lowDate) && new Date(mainDate) <= new Date(highDate);
}

// Convierte un objeto Date de JavaScript a una cadena en formato "YYYY-MM-DD"
export function formatDate(date) {
    // Extrae año, mes y día
    let y = date.getFullYear();
    let m = '' + (date.getMonth() + 1);
    let d = '' + date.getDate();

    // Agrega padding de 0 en caso de requerirse
    if (m.length < 2) m = '0' + m;
    if (d.length < 2) d = '0' + d;
    return [y, m, d].join('-');
}

// Recibe una fecha en un formato que debe procesarse para mostrarse en "YYYY-MM-DD"
export function dateTickFormatter(date) {
    return formatDate(new Date(date * 1000))
}