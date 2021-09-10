import React from 'react';
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/login"> 
          <Login/>
        </Route>

        <Route path="/signup"> 
          <Signup/>
        </Route>

        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
