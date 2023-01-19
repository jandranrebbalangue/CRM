import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { useParams } from "react-router-dom"
import { ClientsProps, USER_KEY } from "../../constants";
import Back from "../components/Back";
import Avatar from "../components/Avatar";

const View = (): ReactJSXElement => {
  const { id } = useParams();
  const getUserData = localStorage.getItem(USER_KEY) as string
  const data = JSON.parse(getUserData)
  const currentClient = data.find((item: ClientsProps) => item.id === id)
  return (
    <div className="w-100">
      <div className="mb-4">
        <Back />
      </div>
      <Card className="mb-4" key={id}>
        <Card.Body className="d-flex align-items-start justify-content-start">
          <Avatar avatar={currentClient?.avatar} />
          <div className="flex-grow-1 ms-4">
            <Row className="mb-2">
              <Col className="d-flex align-items-center justify-content-between">
                <h4 className="mb-0">
                  <strong>{currentClient.name}</strong>
                </h4>
                <div className="d-flex align-items-center justify-content-end">
                  <Badge
                    bg={
                      currentClient.status === "Active" ? "success" : "danger"
                    }
                    className="me-2 text-capitalize"
                  >
                    Status:{currentClient.status}
                  </Badge>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <ul className="list-unstyled">
                  <li>
                    Contact information: <strong>{currentClient.contact}</strong>
                  </li>
                  <li>
                    Organization: <strong>{currentClient.organization}</strong>
                  </li>
                </ul>
              </Col>
              <Col>

                <ul className="list-unstyled">
                  <li>
                    Assigned User: <strong>{currentClient.assignedUser}</strong>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default View


