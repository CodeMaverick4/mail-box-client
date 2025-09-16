import React, { useState } from "react";
import { Container, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { TypeBold, TypeItalic, Paperclip, Link } from "react-bootstrap-icons";

function MailForm() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");

    const handleSend = () => {
        alert(`Mail sent!\nFrom: ${from}\nTo: ${to}\nMessage: ${message}`);
        setFrom("");
        setTo("");
        setMessage("");
    };

    const makeBold = () => {
        const selection = window.getSelection();
        if (!selection.isCollapsed) {
            document.execCommand("bold");   // Only applies to selected text
            selection.collapseToEnd();      // Collapse selection so typing is normal
        }
    };


    return (
        <Container className="mt-4 d-flex justify-content-center">
            <Row className="w-100">
                <Col md={{ span: 8, offset: 2 }}>
                    <h3 className="mb-3 text-center">Compose Mail</h3>
                    <Form>
                        {/* From */}
                        <Form.Group className="mb-3" controlId="formFrom">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </Form.Group>

                        {/* To */}
                        <Form.Group className="mb-3" controlId="formTo">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter recipient email"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </Form.Group>

                        {/* Message */}
                        <Form.Group className="mb-3" controlId="formMessage">
                            <Form.Label>Message</Form.Label>

                            {/* Formatting Buttons */}
                            <InputGroup className="mb-2">
                                <Button variant="outline-secondary" onClick={makeBold}>
                                    <TypeBold />
                                </Button>
                                <Button variant="outline-secondary" onClick={() => document.execCommand("italic")}>
                                    <TypeItalic />
                                </Button>
                                <Button variant="outline-secondary" onClick={() => { }}>
                                    <Paperclip />
                                </Button>
                                <Button variant="outline-secondary" onClick={() => { }}>
                                    <Link />
                                </Button>
                            </InputGroup>

                            <div
                                contentEditable={true}
                                className="form-control "
                                style={{
                                    minHeight: "150px",
                                }}
                            ></div>
                        </Form.Group>

                        {/* Send Button */}
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" onClick={handleSend}>
                                Send
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default MailForm;
