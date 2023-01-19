import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useForm, FormProvider } from "react-hook-form";
import { STATUS_OPTIONS } from "../../constants";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Select from "../components/Select";
import Date from "../components/Date";
import dayjs from "dayjs";


interface StatusFilterProps {
  setStatusFilter: Function;
  setDateFilter: Function;
}

const Filters: React.FC<StatusFilterProps> = ({ setStatusFilter, setDateFilter }): ReactJSXElement => {
  const methods = useForm();
  const { watch } = methods;
  const status = watch("status")
  const createdBy = watch("createdBy")

  useEffect(() => {
    if (status !== "") {
      setStatusFilter(status)
    } else {
      setStatusFilter("")
    }
    if (createdBy !== null) {
      const formatDate = dayjs(createdBy).format("MM/DD/YYYY")
      setDateFilter(formatDate)
    } else {
      const formatDate = dayjs().format("MM/DD/YYYY")
      setDateFilter(formatDate)
    }
  }, [status, createdBy])

  return (
    <FormProvider {...methods}>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>
            <h4 className="font-weight-bold">Filter by</h4>
          </Card.Title>
          <Form>
            <Row className="mb-2">
              <Col>
                <Select
                  id="status"
                  label="Status"
                  options={STATUS_OPTIONS}
                  isClearable={true}
                  value={status}
                />
              </Col>
              <Col>
                <Date id="createdBy" label="Created By" name="createdBy" value={createdBy} />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </FormProvider>
  );
};

export default Filters;
