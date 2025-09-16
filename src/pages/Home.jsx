import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Home() {
  const [mails, setMails] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axios.get(
          "https://todo-app-75d12-default-rtdb.firebaseio.com/mails.json"
        );
        if (response.data) {
          // Realtime DB returns an object with keys, convert to array
          const mailList = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }));
          // Sort by timestamp (latest first)
          mailList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setMails(mailList);
        }
      } catch (error) {
        console.error("Error fetching mails:", error);
      }
    };

    fetchMails();
  }, []);

  return (
    <Container className="mt-2">
      <h3 className="mb-3">Welcome to Mail Box!!!</h3>
      <hr />
      <div className="d-flex justify-content-end mb-2">
        <Button variant="primary" onClick={()=>navigate('/mail')}>
          Compose
        </Button>
      </div>
      {mails.length === 0 && <p>No mails yet.</p>}

      {mails.map((mail) => (
        <Card className="mb-3" key={mail.id}>
          <Card.Header>
            <strong>From:</strong> {mail.from} | <strong>To:</strong> {mail.to}
          </Card.Header>
          <Card.Body>
            <div dangerouslySetInnerHTML={{ __html: mail.message }} />
            <small className="text-muted">
              {new Date(mail.timestamp).toLocaleString()}
            </small>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
