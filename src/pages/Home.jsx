import { useEffect, useState } from "react";
import { Container, Card, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Home() {
  const [mails, setMails] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchMails = async () => {
    try {
      const url = `https://todo-app-75d12-default-rtdb.firebaseio.com/mails.json`;
      const response = await axios.get(url);

      let unread = 0;

      if (response.data) {
        const mailList = Object.keys(response.data)
          .map((key) => {
            if (!response.data[key].read) unread += 1;
            return { id: key, ...response.data[key] };
          })
          // .filter((mail) => mail.to === user.email)
          // .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setUnreadCount(unread);
        setMails(mailList);
      }
    } catch (error) {
      console.error("Error fetching mails:", error);
    }
  };

  const handleMailClick = async (mail) => {
    if (!mail.read) {
      try {
        const updateUrl = `https://todo-app-75d12-default-rtdb.firebaseio.com/mails/${mail.id}.json`;
        await axios.put(updateUrl, { ...mail, read: true });

        setMails((prevMails) =>
          prevMails.map((m) => (m.id === mail.id ? { ...m, read: true } : m))
        );
        setUnreadCount((prev) => prev - 1);
      } catch (error) {
        console.error("Error marking mail as read:", error);
      }
    }
  };

  const handleDelete = async (mail) => {
    try {
      const deleteUrl = `https://todo-app-75d12-default-rtdb.firebaseio.com/mails/${mail.id}.json`;
      await axios.delete(deleteUrl);

      // Update local state
      setMails((prevMails) => prevMails.filter((m) => m.id !== mail.id));

      // Adjust unread count if the mail was unread
      if (!mail.read) setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  useEffect(() => {
    fetchMails();
  }, [user.email]);

  return (
    <Container className="mt-2">
      <h3 className="mb-3">
        Welcome to Mail Box!!! <Badge bg="danger">{unreadCount} Unread</Badge>
      </h3>
      <hr />
      <div className="d-flex justify-content-end mb-2">
        <Button variant="primary" onClick={() => navigate("/mail")}>
          Compose
        </Button>
      </div>
      {mails.length === 0 && <p>No mails yet.</p>}

      {mails.map((mail) => (
        <Card
          className={`mb-3 ${!mail.read ? "border-primary" : ""}`}
          key={mail.id}
        >
          <Card.Header
            style={{ cursor: "pointer" }}
            onClick={() => handleMailClick(mail)}
          >
            <strong>From:</strong> {mail.from} | <strong>To:</strong> {mail.to}{" "}
            {!mail.read && <Badge bg="primary">Unread</Badge>}
          </Card.Header>
          <Card.Body style={{ cursor: "pointer" }} onClick={() => handleMailClick(mail)}>
            <div>{mail.message.substring(0, 50)}...</div>
            <small className="text-muted">
              {new Date(mail.timestamp).toLocaleString()}
            </small>
            <div className="mt-2">
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering mail click
                  handleDelete(mail);
                }}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
