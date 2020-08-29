import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { gql, useQuery, NetworkStatus } from "@apollo/client";

import { Row, Col } from "react-bootstrap";

import { useAuthState, useAuthDispatch } from "../context/authcontext";

const Home = () => {
  const { user, isLoaded } = useAuthState();
  const dispatch = useAuthDispatch();
  useEffect(() => {
    dispatch({ type: "HOMEPAGELOADED", isLoaded: true });
    if (isLoaded) {
      refetch();
    }
  }, []);

  const { loading, data, error, refetch, networkStatus } = useQuery(GET_USERS);

  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }

  let userContent;
  if (!data || loading || networkStatus === NetworkStatus.refetch) {
    userContent = <p>Loading..</p>;
  } else if (data.getUsers.length === 0) {
    userContent = <p>No users have joined yet..</p>;
  } else {
    userContent = data.getUsers.map((user, index) => (
      <div key={index}>
        <h4>{user.username}</h4>
      </div>
    ));
  }

  return (
    <div>
      {user && user.username ? (
        <Row className="text-white">
          <Col xs={4}>{userContent}</Col>
          <Col xs={8}>Messages</Col>
        </Row>
      ) : (
        <Redirect to="/auth" />
      )}
    </div>
  );
};

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
    }
  }
`;

export default Home;
