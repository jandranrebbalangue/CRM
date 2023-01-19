/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Input from "../../components/Input";
import Save from "../../components/Save";
import { ClientsProps, STATUS_OPTIONS, USER_KEY } from "../../../constants";
import Select from "../../components/Select";
import Spinner from "../../components/Spinner";
import dayjs from "dayjs";

interface FormValues {
  id: string,
  name: string;
  contact: number;
  avatar: string;
  organization: string;
  assignedUser: string;
  status: string,
  createdBy: string,
}

const AddClientForm = (): ReactJSXElement => {
  const [error, setFormError] = useState("");
  const [processing, setProcessing] = useState(true);
  const methods = useForm<FormValues>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleSubmit, getValues, reset, formState, watch } = methods;
  const { isSubmitting, isDirty } = formState;
  const status = watch("status");
  const assignedUser = watch("assignedUser")
  const getUserData = localStorage.getItem(USER_KEY) as string
  const data = JSON.parse(getUserData)
  const assignedUserOptions = data?.filter((item: ClientsProps) => item.id !== id).map((item: ClientsProps) => ({
    label: item.name,
    value: item.name
  }));

  const onSubmit: SubmitHandler<FormValues> = data => {
    try {
      const uuid = uuidv4();
      const randomId = uuid.split("-").join("")
      data.createdBy = dayjs().format("MM/DD/YYYY");
      data.id = randomId;
      const userData = JSON.stringify([data])
      const getClientsData = localStorage.getItem(USER_KEY) as string
      if (getClientsData !== null) {
        const currentData = JSON.parse(getClientsData);
        currentData.push(data)
        localStorage.setItem(USER_KEY, JSON.stringify(currentData))
        navigate("/")
      } else {
        localStorage.setItem(USER_KEY, userData)
        navigate("/")
      }

      if (id != null) {
        const currentData = JSON.parse(getClientsData);
        const d = currentData.find((item: ClientsProps) => item.id === id);
        d.status = data.status;
        const idx = currentData.findIndex((item: ClientsProps) => item.id === id);
        currentData[idx] = d;
        localStorage.setItem(USER_KEY, JSON.stringify(currentData))
      }
    } catch (error) {
      if (typeof error === "string") {
        error.toUpperCase();
      } else if (error instanceof Error) {
        setFormError(error.message)
      }
    }
  };

  useEffect(() => {
    let cancel = false;
    const getItem = (): void => {
      setProcessing(true);
      try {
        const getUserData = localStorage.getItem(USER_KEY) as string
        const data = JSON.parse(getUserData)
        const currentClient = data.find((item: ClientsProps) => item.id === id)
        if (cancel) return;
        const values = {
          ...getValues(),
          ...currentClient,
        };
        reset(values);
      } catch (error) {
        if (typeof error === "string") {
          error.toUpperCase();
        } else if (error instanceof Error) {
          setFormError(error.message)
        }
      }
      setProcessing(false);
    };

    if (id != null) getItem();
    else setProcessing(false);

    return () => {
      cancel = true;
    };
  }, [id, getValues, reset]);

  if (processing) return <Spinner />;

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {error !== "" && (
          <Row>
            <Col>
              <p className="text-danger text-center">
                <strong>{error}</strong>
              </p>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Input
              id="name"
              label="Name"
              horizontal={true}
              isDisabled={typeof id === "string"}
            />
            <Input
              id="contact"
              label="Contact"
              type="number"
              horizontal={true}
              isDisabled={typeof id === "string"}
            />
            <Input
              id="organization"
              label="Organization"
              horizontal={true}
              isDisabled={typeof id === "string"}
            />
            <Select id="assignedUser" label="Assigned User"
              horizontal={true}
              options={assignedUserOptions}
              isDisabled={typeof id === "string"}
              value={assignedUser} />
            <Select
              id="status"
              label="Status"
              options={STATUS_OPTIONS}
              horizontal={true}
              value={status}
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Save isSubmitting={isSubmitting} isDirty={isDirty} />
          </Col>
        </Row>
      </Form>
    </FormProvider>

  );
};

export default AddClientForm;
