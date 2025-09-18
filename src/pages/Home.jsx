import { useState } from "react";
import { Container, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Inbox from "../components/Inbox";
import useMails from "../hooks/useMails";

export default function Home() {
  const [showInbox, setShowInbox] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { mails, unreadCount, markAsRead, deleteMail } = useMails(user?.email);

  const filteredMails = mails
    .filter((mail) =>
      showInbox ? mail.to === user.email : mail.from === user.email
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <Container className="mt-2">
      <h3 className="mb-3">
        Welcome to Mail Box!!! <Badge bg="danger">{unreadCount} Unread</Badge>
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
        handleDelete={deleteMail}
        handleMailClick={markAsRead}
        mails={filteredMails}
      />
    </Container>
  );
}
