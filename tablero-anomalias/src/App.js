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
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const DataContext = createContext([[], () => {}]);

function App() {
    const [user] = useState("Charlie");
    const [anomalyData, setAnomalyData] = useState(undefined);

    return (
        <DataContext.Provider value={{ anomalyData, setAnomalyData, user }}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/selectColumn" element={<SelectColumn />} />
                </Routes>
                <Footer />
            </Router>
        </DataContext.Provider>
    );
}

export default App;
