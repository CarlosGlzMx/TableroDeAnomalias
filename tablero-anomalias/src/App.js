import React, { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
export const ConfigContext = createContext([[], () => {}]);

// Variables por defecto para los contextos
const defaultConfig = {
    fecha_min: "2020-10-10",
    fecha_max: "2020-10-30",
    fecha_inicio: "2020-10-15",
    fecha_fin: "2020-10-25",
    seleccion_g4: undefined,
    seleccion_g5_1: undefined,
    selecciong5_2: undefined,
    seleccion_g6_1: undefined,
    seleccion_g6_2: undefined,
    umbral_anomalia: 0,
    min_score: -0.5,
    max_score: 0.5,
};

// -- Pendientes Leyva --
// Manejo correcto de ids (Falta manejo de ids en logout y acceso a dashboard prematuro)
// Eliminar localstorage fuera de la sesion y manejo de errores
// Post y carga de tableros
// Manejo correcto de config (BoardRow get, BoardRow delete, Dashboard post, Logout)
// -- Pendientes Leyva --

function App() {
    // Dos variables que deben de ser accesibles desde toda la aplicación
    // Variable que contiene ids de usuario, de cargas
    const [ids, setIds] = useState(undefined);
    // Variable que contiene los filtros seleccionados para las gráficas
    const [config, setConfig] = useState(defaultConfig);

    useEffect(() => {
        if (sessionStorage.getItem("ids") && ids === undefined) {
            setIds(JSON.parse(sessionStorage.getItem("ids")));
        }
    }, [ids, setIds]);

    // Descomentar al terminar manejo de ids
    console.log(ids);

    return (
        <Router>
            <Header />
            <IdsContext.Provider value={{ ids, setIds }}>
                <ConfigContext.Provider value={{ config, setConfig }}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route
                            path="/selectColumn"
                            element={<SelectColumn />}
                        />
                    </Routes>
                </ConfigContext.Provider>
            </IdsContext.Provider>
            <Footer />
        </Router>
    );
}

export default App;
