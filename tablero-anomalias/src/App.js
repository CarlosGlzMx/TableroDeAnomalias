import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header, Login, Dashboard, Footer, Session } from "./components"
import './App.css';
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
      
      //<h1>App - Session</h1>
      <button>Iniciar yjasgxyagdyajgdxaj</button>
      

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
      <div>
        {/* <h1>App - No session</h1> */}
        <div><Dashboard/></div>

      </div>
      
    );
  }
}

export default App;