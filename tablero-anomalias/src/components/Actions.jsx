import React from "react";
import DeleteImg from "../components/images/delete_icon.png";
import DownloadImg from "../components/images/download_icon.png";
import PlusImg from "../components/images/plus_icon.png";
import SaveImg from "../components/images/save_icon.webp";
import ShareImg from "../components/images/share_icon.png";
import UploadImg from "../components/images/upload_icon.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar } from "react-bootstrap";


function Actions() {
	return (
        
        <div class="d-flex justify-content-between">

            <div class="action-left">
                    <h3 className="m-0 p-2">Seleccione la precisión del modelo</h3>
                    <div class="action-left-inline">
                        <h4 className="mt-0 mb-0">-1</h4><input type="range" min="-1" max="1" step="0.1" class="form-range" id="customRange1"></input><h4 className="mt-0 mb-0">1</h4>
                    </div>
                </div>

           
            
            <div class="action-center">
                <label for="start">Fecha inicial: </label>
                <input type="date" name="start-date" />

                <label for="end">Fecha final: </label>
                <input type="date" name="final-date" />
            </div>

           
            <div class="action-right" className="text-right">
                <button class="btn btn-default">
                    {/* <img src={DeleteImg} width="20" />  */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="55" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </button>


                <button class="btn btn-default">
                    {/* <img src={SaveImg} width="20" />  */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-file-earmark-bar-graph" viewBox="0 0 16 16">
                        <path d="M10 13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v6zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z"/>
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                    </svg>
                </button>

                <button class="btn btn-default">
                    {/* <img src={UploadImg} width="20" />  */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                    </svg>
                </button>

                <button class="btn btn-default">
                    {/* <img src={DownloadImg} width="20" />  */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg> 
                </button>

                <button class="btn btn-default">
                    {/* <img src={PlusImg} width="20" />  */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </button>

            </div>
        </div>
 
	);
}

export default Actions;