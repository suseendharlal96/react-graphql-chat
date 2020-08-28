import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Container } from "react-bootstrap";

import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import "./App.scss";
import { AuthProvider } from "./context/authcontext";
import DyanmicRoute from "./util/DynamicRoute";
import SongList from "./pages/SongList";
import SongDetail from "./pages/SongDetail";
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path="/" component={NavBar} />
        <Container>
          <Switch>
            <DyanmicRoute path="/" exact component={Home} authenticated />
            <DyanmicRoute path="/auth" component={AuthForm} guest />
            <Route exact path="/songs" component={SongList} />
            <Route
              exact
              path="/songs/:id"
              render={(props) => <SongDetail {...props} />}
            />
            <Redirect from="**" to="/auth" />
          </Switch>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
