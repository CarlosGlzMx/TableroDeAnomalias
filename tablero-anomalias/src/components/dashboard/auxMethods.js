// Reacomoda variables para guardar fecha en texto como en tipo Date()
export function dateParser(datos) {
    if (datos) {
        console.log(datos);
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