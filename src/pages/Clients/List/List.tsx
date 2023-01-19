import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ClientsProps, USER_KEY } from "../../../constants"
import Item from "./Item";
import Filters from "../Filter"


const List: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const navigate = useNavigate();
  const getUserData = localStorage.getItem(USER_KEY) as string
  const data = JSON.parse(getUserData)

  let body = data?.map((item: ClientsProps) => {
    return <Item
      key={item.id}
      avatar={item.avatar}
      id={item.id}
      name={item.name}
      contact={item.contact}
      organization={item.organization}
      status={item.status}
      createdBy={item.createdBy}
      assignedUser={item.assignedUser} />;
  })
  if (data === null || data.length === 0) {
    body = <div className="text-center">
      <h5>Add your first client</h5>
      <Link
        id="addFromEmpty"
        to={"/add"}
        className="btn btn-primary text-light mt-2"
      >
        <FontAwesomeIcon icon={faPlus} className="me-2" />
        <span> Add</span>
      </Link>
    </div>
  }

  if (statusFilter !== "" && statusFilter !== undefined && dateFilter === undefined || dateFilter === "" && showFilters) {
    body = data?.filter((item: ClientsProps) => item.status === statusFilter
    ).map((item: ClientsProps) => {
      return <Item
        key={item.id}
        avatar={item.avatar}
        id={item.id}
        name={item.name}
        contact={item.contact}
        organization={item.organization}
        status={item.status}
        createdBy={item.createdBy}
        assignedUser={item.assignedUser} />;
    })
  } else if (dateFilter !== "" && dateFilter !== undefined && statusFilter === undefined || statusFilter === "" && showFilters) {
    body = data?.filter((item: ClientsProps) => item.createdBy === dateFilter
    ).map((item: ClientsProps) => {
      return <Item
        key={item.id}
        avatar={item.avatar}
        id={item.id}
        name={item.name}
        contact={item.contact}
        organization={item.organization}
        status={item.status}
        createdBy={item.createdBy}
        assignedUser={item.assignedUser} />;
    })
  } else if (dateFilter !== "" && dateFilter !== undefined && statusFilter !== "" && statusFilter !== undefined) {
    body = data?.filter((item: ClientsProps) => item.createdBy === dateFilter && item.status === statusFilter
    ).map((item: ClientsProps) => {
      return <Item
        key={item.id}
        avatar={item.avatar}
        id={item.id}
        name={item.name}
        contact={item.contact}
        organization={item.organization}
        status={item.status}
        createdBy={item.createdBy}
        assignedUser={item.assignedUser} />;
    })
  }

  return (
    <div className="list w-100">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h1 className="m-4">Clients</h1>
        <div>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => { navigate("/add"); }}
            className="text-light me-2"
          >
            Add Client
          </Button>

          <Button
            type="button"
            variant="outline-dark"
            size="sm"
            onClick={() => {
              setShowFilters((prev) =>
                !prev
              );
            }}
          >
            <FontAwesomeIcon icon={faFilter} className="me-2" />
            {showFilters ? "Hide" : "Show"} Filters
          </Button>
        </div>
      </div>
      {showFilters && <Filters setStatusFilter={setStatusFilter} setDateFilter={setDateFilter} />}
      {body}
    </div>
  )
}

export default List;
