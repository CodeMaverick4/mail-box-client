import { Badge, Button, Card } from "react-bootstrap";

const Inbox = ({mails,handleMailClick,handleDelete})=>{
    mails.length === 0 && <p>No mails yet.</p>
    return(
      mails.map((mail) => (
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
                  e.stopPropagation();
                  handleDelete(mail);
                }}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))
    )
}

export default Inbox