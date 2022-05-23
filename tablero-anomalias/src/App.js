import React, { useState } from "react";
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

function App() {
    const [user] = useState("Charlie");

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                <Route path="/upload" element={<Upload user={user} />} />
                <Route
                    path="/selectColumn"
                    element={<SelectColumn user={user} />}
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
