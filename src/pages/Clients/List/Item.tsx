import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { ClientsProps } from "../../../constants"
import Avatar from "../../components/Avatar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Item: React.FC<ClientsProps> = ({ name, contact, avatar, organization, assignedUser, status, id, createdBy }) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-4" key={id}>
      <Card.Body className="d-flex align-items-start justify-content-start">
        <Avatar avatar={avatar} />
        <div className="flex-grow-1 ms-4">
          <Row className="mb-2">
            <Col className="d-flex align-items-center justify-content-between">
              <h4 className="mb-0">
                <strong>{name}</strong>
              </h4>
              <div className="d-flex align-items-center justify-content-end">
                <Badge
                  bg={
                    status === "Active" ? "success" : "danger"
                  }
                  className="me-2 text-capitalize"
                >
                  Status:{status}
                </Badge>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => { navigate(`/user/edit/${id}`); }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => { navigate(`/user/${id}`); }}
                >
                  View
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ul className="list-unstyled">
                <li>
                  Contact: <strong>{contact}</strong>
                </li>
                <li>
                  Organization: <strong>{organization}</strong>
                </li>
                <li>
                  Creation Date: <strong>{createdBy}</strong>
                </li>
              </ul>
            </Col>
            <Col>

              <ul className="list-unstyled">
                <li>
                  Assigned User: <strong>{assignedUser}</strong>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Item;
