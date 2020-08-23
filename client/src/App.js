import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import RegisterForm from "./pages/RegisterForm";
import Home from "./pages/Home";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" component={RegisterForm} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
