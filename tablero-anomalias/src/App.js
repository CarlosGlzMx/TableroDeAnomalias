import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
    Header,
    Login,
    Dashboard,
    Footer,
    Session,
    Upload,
} from "./components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    if (Session.getSession()) {
        return (
            /*
      <div className="App">
        <Router>
          <Header />
          <Route path="/" exact component={() => <Dashboard />} />
          <Footer />
        </Router>
      </div>
      */
            <div>
                <Header />
                <h1>App - Session</h1>
                <Footer />
            </div>
        );
    } else {
        return (
            /*
      <div className="App">
        <Router>
          <Header />
          <Route path="/" exact component={() => <Login />} />
          <Footer />
        </Router>
      </div>
      */
            <div>
                <Header />
                {/* <h1>App - No session</h1> */}
                <Dashboard />
                <Footer />
            </div>
        );
    }
}

export default App;
