import React from 'react';
import ReactDOM from 'react-dom';
//component file
import TodoContainer from './FunctionBased/Components/TodoContainer';
import "./FunctionBased/App.css"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  // React provides for us the StrictMode to activate checks and logs a warning message at runtime.
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <TodoContainer />
    </Router>  
  </React.StrictMode>, 
  document.getElementById("root")
)