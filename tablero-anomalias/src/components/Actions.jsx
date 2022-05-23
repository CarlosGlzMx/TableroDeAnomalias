import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import html2canvas from "html2canvas";
import jspdf from "jspdf";


function Actions() {
    function printPdf() {
        // Crea el archivo PDF por llenar con componentes de manera personalizada
        const pdf = new jspdf({unit:"pt", format:"letter"});

        // Agrega el encabezado
        /*
        const header = document.querySelectorAll(".c1");
        console.log(header);
        html2canvas(header).then((canvas) => {
            const img = canvas.toDataURL("image/jpeg")
            pdf.addImage(img, "JPEG", 0, 0);
            pdf.save("reporte.pdf");
        });
        */

        let item = document.querySelector(".header");
        html2canvas(item).then((canvas) => {
            const imagen = canvas.toDataURL("image/jpeg");
            pdf.addImage(imagen, "JPEG", 0, 0, 612, 33);
        })

        item = document.querySelector(".c1");
        html2canvas(item).then((canvas) => {
            const imagen = canvas.toDataURL("image/jpeg");
            pdf.addImage(imagen, "JPEG", 57, 58, 220, 220);
        })

        item = document.querySelector(".c2");
        html2canvas(item).then((canvas) => {
            const imagen = canvas.toDataURL("image/jpeg");
            pdf.addImage(imagen, "JPEG", 57, 303, 220, 220);
        })

        item = document.querySelector(".c3");
        html2canvas(item).then((canvas) => {
            const imagen = canvas.toDataURL("image/jpeg");
            pdf.addImage(imagen, "JPEG", 57, 548, 220, 220);
        })

        item = document.querySelector(".c4");
        html2canvas(item).then((canvas) => {
            const imagen = canvas.toDataURL("image/jpeg");
            pdf.addImage(imagen, "JPEG", 335, 58, 220, 220);
        })

        item = document.querySelector(".c5");
        html2canvas(item).then((canvas) => {
            const imagen = canvas.toDataURL("image/jpeg");
            pdf.addImage(imagen, "JPEG", 335, 303, 220, 220);
        })

        item = document.querySelector(".c6");
        html2canvas(item).then((canvas) => {
            const imagen = canvas.toDataURL("image/jpeg");
            pdf.addImage(imagen, "JPEG", 335, 548, 220, 220);
            pdf.save("reporte.pdf");
        })
    }
        
    return (

        <div class="d-flex justify-content-between">

            <div class="action-left">
                <h3 className="m-0 p-2">Seleccione la precisión del modelo</h3>
                <div className="w-100 d-flex align-items-center pb-2">
                    <h4 className="mt-0 mb-0 pt-0">-1</h4>
                    <input type="range" min="-1" max="1" step="0.1" class="form-range" id="customRange1"></input>
                    <h4 className="mt-0 mb-0 pt-0">1</h4>
                </div>
            </div>


            <div class="action-center">
                <label for="start">Fecha inicial: </label>
                <input className="m-2" type="date" name="start-date" />
                <label for="end">Fecha final: </label>
                <input className="m-2" type="date" name="final-date" min="2000-01-01" max="2022-05-20"/>    
            </div>


            <div class="action-right">
                <button class="btn btn-default">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6vh" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </button>


                <button class="btn btn-default" onClick={() => { printPdf() }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6vh" fill="currentColor" class="bi bi-file-earmark-bar-graph" viewBox="0 0 16 16">
                        <path d="M10 13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v6zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                    </svg>
                </button>

                <button class="btn btn-default">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6vh" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                    </svg>
                </button>

                <button class="btn btn-default">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6vh" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                    </svg>
                </button>

                <button class="btn btn-default">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6vh" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                </button>

            </div>
        </div>

    );
}

export default Actions;