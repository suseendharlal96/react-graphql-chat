import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";

const RegisterForm = () => {
  const [form, setform] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [suseeRegister, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();
    console.log(form);
    suseeRegister({ variables: form });
  };

  return (
    <Row className="justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h2 className="text-center">Register</h2>
        <Form onSubmit={register} noValidate>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={errors.email ? "text-danger" : "text-white"}>
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              value={form.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter email"
              disabled={loading}
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Label
              className={errors.username ? "text-danger" : "text-white"}
            >
              Username
            </Form.Label>
            <Form.Control
              type="text"
              value={form.username}
              name="username"
              onChange={handleChange}
              placeholder="Username"
              disabled={loading}
            />
            {errors.username && (
              <Form.Text className="text-danger">{errors.username}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label
              className={errors.password ? "text-danger" : "text-white"}
            >
              Password
            </Form.Label>
            <Form.Control
              type="password"
              value={form.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
              disabled={loading}
            />
            {errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label
              className={errors.confirmPassword ? "text-danger" : "text-white"}
            >
              ConfirmPassword
            </Form.Label>
            <Form.Control
              type="password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm Password"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <Form.Text className="text-danger">
                {errors.confirmPassword}
              </Form.Text>
            )}
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {loading ? "Registering.." : "Register"}
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

const REGISTER_USER = gql`
  mutation suseesignup(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signup(
      signupInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      username
      email
      token
    }
  }
`;

export default RegisterForm;
