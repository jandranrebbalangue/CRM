import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import RBSpinner from "react-bootstrap/Spinner";

const Spinner = (): ReactJSXElement => (
  <div className="h-100 w-100 d-flex justify-content-center align-items-center my-4">
    <RBSpinner animation="border" color="primary" role="status" />
  </div>
);

export default Spinner;

