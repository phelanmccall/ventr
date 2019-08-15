import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import Settings from "./pages/Settings";
import Play from "./pages/Play";
import NoMatch from "./components/NoMatch";
import axios from "axios";


class ReactRouter extends Component {
  state = {
    user : null,
    err : ""
  }

  

  render() {
      return (
      
          <BrowserRouter>
            <Switch>
              
              <Route exact path={["/", "/login"]} component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/play" component={Play} />
              <Route path="/settings" component={Settings}/>
              <Route component={NoMatch} />
            </Switch>
          </BrowserRouter>
        
      );
  }
};

export default ReactRouter;
