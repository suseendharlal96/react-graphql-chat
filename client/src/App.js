import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" component={AuthForm} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
