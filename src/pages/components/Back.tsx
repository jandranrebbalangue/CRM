import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom";

const Back = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      id="back"
      size="sm"
      variant="outline-primary"
      onClick={() => { navigate("/"); }}
      title="Back"
    >
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </Button>
  );
};

export default Back;

