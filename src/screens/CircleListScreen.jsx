import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useGetCircles } from "../features/circles/useCircles";
import { FaTrash } from "react-icons/fa";
import CreateCircleModal from "./CreateCircleModal";
import AssignCircleModal from "./AssignCircleModal";
import { useUsersContext } from "../contexts/UsersContext";
import { useCirclesContext } from "../contexts/CirclesContext";

function CircleListScreen() {
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [AssignModalShow, setAssignModalShow] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState(null);

  // React Query
  const { circles, isLoading, error } = useCirclesContext();
  // const circles = data?.data?.circles || [];

  const navigate = useNavigate();
  const location = useLocation();

  function handleRowClick(id) {
    navigate(`/dashboard/review/${id}`);
  }

  function deleteHandler(id) {
    if (window.confirm("Are you sure")) {
      console.log(`Circle with ID ${id} would be deleted`);
      // Logic to delete circle would go here
    }
  }

  function handleEditClick(circle) {
    setSelectedCircle(circle);
    navigate(`?edit=${circle._id}`);
  }

  function handleCloseModal() {
    setEditModalShow(false);
    setSelectedCircle(null);
    navigate(location.pathname);
  }

  return (
    <div className="container-fluid px-4 mt-6">
      <div className="d-flex justify-content-around align-items-center">
        <div className="d-flex justify-content-start">
          <h2 className="fw-bold">List of Circles</h2>
        </div>
        <div className="container d-flex justify-content-end align-items-center">
          <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Create Circle
            </Button>
            <CreateCircleModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </>
          <>
            <Button
              variant="primary btn-success m-2"
              onClick={() => setAssignModalShow(true)}
            >
              Assign Circle
            </Button>
            <AssignCircleModal
              show={AssignModalShow}
              onHide={() => setAssignModalShow(false)}
            />
          </>
        </div>
      </div>
      <Table striped bordered hover responsive className="table-sm mt-2">
        <thead>
          <tr>
            <th>S/N</th>
            <th>NAME</th>
            <th>Users Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {circles.map((circle, index) => (
            <tr key={circle._id} onClick={() => handleRowClick(circle._id)}>
              <td>{index + 1}</td>
              <td>{circle.name}</td>
              <td>{circle.users ? circle.users.length : 0}</td>
              <td>
                <>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(circle._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CircleListScreen;
