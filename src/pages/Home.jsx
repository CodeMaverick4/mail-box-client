import { useEffect, useState } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Inbox from "../components/Inbox";

export default function Home() {
  const [mails, setMails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showInbox, setShowInbox] = useState(true); 
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log(user.email)

  const fetchMails = async () => {
    try {
      const url = `https://todo-app-75d12-default-rtdb.firebaseio.com/mails.json`;
      const response = await axios.get(url);

      let unread = 0;

      if (response.data) {
        const mailList = Object.keys(response.data).map((key) => {
          const mail = response.data[key];
          if (!mail.read && mail.to === user.email) unread += 1;
          return { id: key, ...mail };
        });

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

      setMails((prevMails) => prevMails.filter((m) => m.id !== mail.id));

      if (!mail.read && mail.to === user.email) {
        setUnreadCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMails();
  }, [user.email]);

  const filteredMails = mails
    .filter((mail) =>
      showInbox ? mail.to === user.email : mail.from === user.email
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <Container className="mt-2">
      <h3 className="mb-3">
        Welcome to Mail Box!!!{" "}
        <Badge bg="danger">{unreadCount} Unread</Badge>
      </h3>
      <hr />

      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex align-items-center gap-3">
          <Button
            variant={showInbox ? "primary" : "outline-primary"}
            onClick={() => setShowInbox(true)}
          >
            Inbox
          </Button>
          <Button
            variant={!showInbox ? "primary" : "outline-primary"}
            onClick={() => setShowInbox(false)}
          >
            Sent Mail
          </Button>
        </div>
        <Button variant="success" onClick={() => navigate("/mail")}>
          Compose
        </Button>
      </div>

      <Inbox
        handleDelete={handleDelete}
        handleMailClick={handleMailClick}
        mails={filteredMails}
      />
    </Container>
  );
}
