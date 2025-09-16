import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlicer";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState({
        email: "",
        password: "",
    });

    const [serverMessage, setServerMessage] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        setError({ ...error, [e.target.name]: '' })
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.email === '') {
            setError(prev => ({ ...prev, email: "Please Enter email" }))
            return
        }
        if (form.password === '') {
            setError(prev => ({ ...prev, password: "Please Enter password" }))
            return
        }

        if (isLoading) return;
        try {
            setIsLoading(true);
            const res = await signInWithEmailAndPassword(auth, form.email, form.password);
            const user = { displayName: res.user.displayName, photoURL: res.user.photoURL, email: res.user.email, emailVerified: res.user.emailVerified, uid: res.user.uid };
            const token = await res.user.getIdToken();

            dispatch(login({ user: user, token: token }))
            
            setIsLoading(false);
            navigate("/home");

        } catch (err) {
            setIsLoading(false);
            alert(err.message);
            setServerMessage(err.message || "Something went wrong..");
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

                                <Button type="submit" className="w-100" disabled={isLoading}>
                                    {isLoading ? "Loading..." : "Login"}
                                </Button>
                            </Form>

                            <Button
                                variant="link"
                                className="mt-3 w-100"
                                onClick={() => navigate("/signup")}
                            >
                                Don't Have an account? <span>Signup</span>
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Login;
