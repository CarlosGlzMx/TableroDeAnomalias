export default function dateParser(datos) {
    for (var i = 0; i < Object.keys(datos.fecha).length; i++) {
        datos.fecha[i] = Date(datos.fecha[i]);
    }
    return datos;
}
