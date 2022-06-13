import html2canvas from "html2canvas";
import jspdf from "jspdf";

export function printPdf() {
    // Basado en código de Zolotarenko, E. https://start-up.house/en/blog/articles/converting-html-to-pdf
    // Crea el archivo PDF por llenar con componentes de manera personalizada
    const pdf = new jspdf({ unit: "pt", format: "letter" });

    // Agrega el encabezado ajustado a un pdf tamaño carta
    const [header_w, header_h] = [612, 33]
    const header = document.querySelector("#header");
    html2canvas(header).then((canvas) => {
        const imagen = canvas.toDataURL("image/jpeg");
        pdf.addImage(imagen, "JPEG", 0, 0, header_w, header_h);
    })

    // Define los valores de tamaños y margenes para colocar las 6 gráficas
    const [chart_w, chart_h, margin_hor, margin_ver] = [220, 220, 57.3, 16];

    // Itera los objetos HTML de gráficas
    let charts = document.querySelectorAll(".chart");
    charts.forEach((element, i) => {
        html2canvas(element).then((canvas) => {
            // Crea una imagen jpeg de la gráfica
            const imagen = canvas.toDataURL("image/jpeg");

            // Calcula las coordenadas adecuadas para pegar el jpeg en el pdf
            const new_x = (i % 2 + 1) * margin_hor + (i % 2) * chart_w;
            const new_y = header_h + (Math.floor(i / 2) + 1) * margin_ver + (Math.floor(i / 2)) * chart_h;
            pdf.addImage(imagen, "JPEG", new_x, new_y, chart_w, chart_h);


        })
    })

    // Agrega la barra de configuración ajustado a un pdf tamaño carta
    const [actions_w, actions_h] = [612, 33]
    const bar = document.querySelector(".action-bar");
    html2canvas(bar).then((canvas) => {
        const imagen = canvas.toDataURL("image/jpeg");
        pdf.addImage(imagen, "JPEG", 0, 759, actions_w, actions_h);
        pdf.save("reporte.pdf");
    })
}