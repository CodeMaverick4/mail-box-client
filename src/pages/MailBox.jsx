import { useRef, useState } from "react";
import { Container, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { TypeBold, TypeItalic, Paperclip, Link } from "react-bootstrap-icons";
import axios from "axios";
import { useNavigate } from "react-router";

function MailForm() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");
    const messageRef = useRef(null);
    const navigate = useNavigate();

    const handleSend = async () => {
        const messageContent = messageRef.current.innerHTML;
        if (!from || !to || !messageContent) {
            alert("Please fill all fields!");
            return;
        }

        try {
            await axios.post(
                "https://todo-app-75d12-default-rtdb.firebaseio.com/mails.json",
                {
                    from,
                    to,
                    message: messageContent,
                    timestamp: new Date().toISOString(),
                    read:false
                }
            );

            alert("Mail sent and saved to Firebase Realtime Database!");
            setFrom("");
            setTo("");
            if (messageRef.current) messageRef.current.innerHTML = "";
            navigate('/home')
        } catch (error) {
            console.error("Error sending mail:", error);
            alert("Failed to send mail. Check console for details.");
        }
    };

    const makeBold = () => {
        const selection = window.getSelection();
        if (!selection.isCollapsed) {
            document.execCommand("bold");
            selection.collapseToEnd();
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
                                ref={messageRef
                                }
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
        </Container >
    );
}

export default MailForm;
