import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
    Header,
    Login,
    Upload,
    SelectColumn,
    Dashboard,
    Footer,
} from "./components";

// Importante mantener este orden para la prioridad de nuestro CSS sobre Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/colors.css";
import "./styles/App.css";

// Creación de contextos desde el componente mayor de la aplicación para acceso compartido
export const IdsContext = createContext([[], () => {}]);

function App() {
    // Variable que contiene ids de usuario, de cargas
    const [ids, setIds] = useState(undefined);

    useEffect(() => {
        if (sessionStorage.getItem("ids") && ids === undefined) {
            setIds(JSON.parse(sessionStorage.getItem("ids")));
        }
    }, [ids, setIds]);

    return (
        <BrowserRouter>
            <Header />
            <IdsContext.Provider value={{ ids, setIds }}>
                <Routes>
                    <Route path="/TableroDeAnomalias/" element={<Login />} />
                    <Route path="/TableroDeAnomalias/dashboard" element={<Dashboard />} />
                    <Route path="/TableroDeAnomalias/upload" element={<Upload />} />
                    <Route path="/TableroDeAnomalias/selectColumn" element={<SelectColumn />} />
                </Routes>
            </IdsContext.Provider>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
