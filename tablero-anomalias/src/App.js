import React, { useState, createContext } from "react";
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
import { AddAlarmSharp } from "@mui/icons-material";

// Creación de contextos desde el componente mayor de la aplicación para acceso compartido
export const IdsContext = createContext([[], () => {}]);
export const ConfigContext = createContext([[], () => {}]);
export const DataContext = createContext([[], () => {}]);

// Variables por defecto para los contextos
// Usuario temporal para el desarrollo eliminar al final
const defaultIds = { usuario: "Charlie", carga: undefined, tablero: undefined };
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
// Manejo correcto de ids
// Manejo correcto de config
// Post y carga de tableros
// -- Pendientes Leyva --

function App() {
    // Tres variables que deben de ser accesibles desde toda la aplicación
    // Variable que contiene ids de usuario, de cargas
    const [ids, setIds] = useState(defaultIds);
    // Variable que contiene los filtros seleccionados para las gráficas
    const [config, setConfig] = useState(defaultConfig);

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
