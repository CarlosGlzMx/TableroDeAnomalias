import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header, Login, Dashboard, Footer, Session } from "./components";
import 'bootstrap/dist/css/bootstrap.min.css';


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
      <h1>App - Session</h1>
    );
  }
  else {
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
      <Login></Login>
    );
  }
}

export default App;