import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";

import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import "./App.scss";
import { AuthProvider } from "./context/authcontext";
import ApolloProvider from "./ApolloProvider";
const App = (props) => {
  return (
    <ApolloProvider>
      <AuthProvider>
        <BrowserRouter>
          <Route path="/" component={NavBar} />
          <Container>
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/auth" component={AuthForm} />
              <Redirect from="**" to="/auth" />
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
