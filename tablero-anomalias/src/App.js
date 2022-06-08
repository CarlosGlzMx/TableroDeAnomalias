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

function App() {
    // Variable que contiene ids de usuario, de cargas
    const [ids, setIds] = useState(undefined);

    useEffect(() => {
        if (sessionStorage.getItem("ids") && ids === undefined) {
            setIds(JSON.parse(sessionStorage.getItem("ids")));
        }
    }, [ids, setIds]);

    return (
        <Router>
            <Header />
            <IdsContext.Provider value={{ ids, setIds }}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/selectColumn" element={<SelectColumn />} />
                </Routes>
            </IdsContext.Provider>
            <Footer />
        </Router>
    );
}

export default App;
