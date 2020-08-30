import React from "react";
import { Link } from "react-router-dom";

import { Button, Navbar } from "react-bootstrap";

import { useAuthDispatch, useAuthState } from "../context/authcontext";

const NavBar = (props) => {
  const dispatch = useAuthDispatch();
  const { user } = useAuthState();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    props.history.push("/auth");
  };
  return (
    <Navbar fixed="top" bg="primary" variant="dark">
      <Navbar.Brand>
        <Link to={user && user.username ? "/" : "/auth"}>
          <Button>Home</Button>
        </Link>
        <Link to="/songs">
          <Button>Songs</Button>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {user && user.username ? (
          <>
            <Button onClick={logout}>Logout</Button>
            <Navbar.Text style={{ color: "yellow" }}>
              Signed in as: {user.username}
            </Navbar.Text>
          </>
        ) : (
          <Navbar.Brand>
            <Link to="/auth">
              <Button>Register/Signin</Button>
            </Link>
          </Navbar.Brand>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
