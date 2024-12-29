import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import Message from "./../components/Message";
import Loader from "./../components/Loader";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import { useGetUsers } from "../features/users/useUser";
import { useUsersContext } from "../contexts/UsersContext";

const UserListScreen = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const navigate = useNavigate();
  const { users, isLoading, error } = useUsersContext();
  console.log(users);
  // const {data, isLoading, error} = useGetUsers()
  // const users = data?.data;

  function handleRowClick(id) {
    navigate(`/dashboard/review/${id}`);
  }

  function deleteHandler(id) {
    if (window.confirm("Are you sure")) {
      console.log(`User with ID ${id} would be deleted`);
      // Logic to delete user would go here
    }
  }

  return (
    <>
      <div className="px-4 m-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Users</h1>
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Create User
          </Button>

          <CreateUserModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>S/N</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE NUMBER</th>
                <th>ADMIN-STATUS</th>
                <th>ROLE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} onClick={() => handleRowClick(user._id)}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.mobile}</td>
                  <td>{user.isAdmin ? "Admin User" : "Regular User"}</td>
                  <td>{user.roles}</td>
                  <td>
                    <>
                      <Button
                        variant="light"
                        className="btn-sm"
                        onClick={() => setShowEditUserModal(true)}
                      >
                        <FaEdit />
                      </Button>
                      <EditUserModal
                        show={showEditUserModal}
                        onHide={() => setShowEditUserModal(false)}
                      />
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default UserListScreen;
