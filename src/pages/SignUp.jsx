import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    cnfPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    cnfPassword: "",
  });
  const [serverMessage, setServerMessage] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setError({ ...error, [e.target.name]: "" });
    setForm({ ...form, [e.target.name]: e.target.value });
    setServerMessage({ type: "", message: "" }); // clear server messages on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Basic validation
    if (!form.email) {
      setError((prev) => ({ ...prev, email: "Please enter email" }));
      return;
    }
    if (!form.password) {
      setError((prev) => ({ ...prev, password: "Please enter password" }));
      return;
    }
    if (!form.cnfPassword) {
      setError((prev) => ({ ...prev, cnfPassword: "Please enter confirm password" }));
      return;
    }
    if (form.password !== form.cnfPassword) {
      setServerMessage({ type: "danger", message: "Password and confirm password do not match." });
      return;
    }

    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      setServerMessage({ type: "success", message: "User signed up successfully!" });
      setTimeout(() => navigate("/home"), 1500); // Navigate after 1.5s
    } catch (err) {
      setServerMessage({ type: "danger", message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="background-image-pos">
        <img src="background-image.jpg" alt="Background" />
      </div>

      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col md={{ span: 4, offset: 4 }}>
            <Card className="shadow p-4">
              <Card.Title className="text-center mb-4 fw-bold">Sign Up</Card.Title>

              {/* Server messages */}
              {serverMessage.message && (
                <Alert variant={serverMessage.type}>{serverMessage.message}</Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    isInvalid={!!error.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    isInvalid={!!error.password}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{error.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCnfPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="cnfPassword"
                    value={form.cnfPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    isInvalid={!!error.cnfPassword}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{error.cnfPassword}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="w-100" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Sign Up"}
                </Button>
              </Form>

              <Button
                variant="link"
                className="mt-3 w-100"
                onClick={() => navigate("/")}
              >
                Have an account? <span>Login</span>
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
