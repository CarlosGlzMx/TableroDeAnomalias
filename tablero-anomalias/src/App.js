import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
    Header,
    Login,
    Dashboard,
    ListboxDashboard,
    Footer,
    Session,
    Upload,
    SelectColumn,
} from "./components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
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
    );
}

export default App;
