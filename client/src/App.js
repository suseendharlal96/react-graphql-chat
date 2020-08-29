import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Container } from "react-bootstrap";

import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import "./App.scss";
import { AuthProvider } from "./context/authcontext";
import DyanmicRoute from "./util/DynamicRoute";
// lazily load
const SongList = lazy(() => import("./pages/SongList"));
const SongCreate = lazy(() => import("./pages/SongCreate"));
const SongDetail = lazy(() => import("./pages/SongDetail"));
// import SongList from "./pages/SongList";
// import SongDetail from "./pages/SongDetail";
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path="/" component={NavBar} />
        <Container>
          <Switch>
            <DyanmicRoute path="/" exact component={Home} authenticated />
            <DyanmicRoute path="/auth" component={AuthForm} guest />
            {/* <Route exact path="/songs" component={SongList} />
            <Route exact path="/songs/:id" component={SongDetail} /> */}
            <Suspense fallback={<div>Loading..</div>}>
              <Route
                exact
                path="/songs"
                render={(props) => <SongList {...props} />}
              />
              <Route
                exact
                path="/song/create"
                render={(props) => <SongCreate {...props} />}
              />
              <Route
                path="/songs/:id"
                render={(props) => <SongDetail {...props} />}
              />
            </Suspense>
            <Redirect from="**" to="/auth" />
          </Switch>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
