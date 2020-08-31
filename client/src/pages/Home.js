import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { gql, useQuery, NetworkStatus } from "@apollo/client";

import { Row, Col, Image } from "react-bootstrap";

import Profile from "../assets/blank-profile.png";
import Message from "../components/Message";
import { useAuthState, useAuthDispatch } from "../context/authcontext";

const Home = () => {
  const { user, isLoaded } = useAuthState();
  const dispatch = useAuthDispatch();

  const [username, setUsername] = useState(null);

  useEffect(() => {
    dispatch({ type: "HOMEPAGELOADED", isLoaded: true });
    if (isLoaded) {
      refetch();
    }
  }, []);

  const { loading, data, error, refetch, networkStatus } = useQuery(GET_USERS);

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
      <div
        onClick={() => setUsername(user.username)}
        className="d-flex p-3"
        style={{ borderBottom: "1px solid black", cursor: "pointer" }}
        key={index}
      >
        <Image
          src={user.imageUrl ? user.imageUrl : Profile}
          roundedCircle
          className="mr-2 "
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
        <div>
          <p className="text-warning">{user.username}</p>
          <p className="font-weight-light">
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected"}
          </p>
        </div>
      </div>
    ));
  }

  return (
    <div>
      {user && user.username ? (
        <Row className="bg-white">
          <Col xs={4} className="p-0 text-white users-section">
            {userContent}
          </Col>
          <Col xs={8}>
            {data && data.getUsers.length > 0 && (
              <Message username={username} />
            )}
          </Col>
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
      imageUrl
      latestMessage {
        content
      }
    }
  }
`;

export default Home;
