import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Circles = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [circleName, setCircleName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard/circles') {
      setShowModal(true);
    }
  }, [location]);

  useEffect(() => {
    // Fetch users here
    // Replace with your user fetching logic
    const fetchUsers = async () => {
      // Example static list of users
      const usersList = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
      ];
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setCircleName('');
    setSelectedUser('');
  };

  const handleShow = () => {
    setShowModal(true);
    setIsEditing(false); // Set to false when opening the modal for a new circle
    setCircleName('');
    setSelectedUser('');
  };

  const handleEditShow = (circle) => {
    setShowModal(true);
    setIsEditing(true); // Set to true when opening the modal for editing
    setCircleName(circle.name);
    setSelectedUser(circle.userId);
  };

  const handleSave = () => {
    // Add save logic here
    console.log('Saving new circle:', { circleName, selectedUser });
    handleClose();
  };

  const handleUpdate = () => {
    // Add update logic here
    console.log('Updating existing circle:', { circleName, selectedUser });
    handleClose();
  };

  const handleCircleNameChange = (e) => setCircleName(e.target.value);
  const handleSelectedUserChange = (e) => setSelectedUser(e.target.value);

  return (
    <div>
      <h1>Circles</h1>
      <Button variant="primary" onClick={handleShow}>
        Create Circle
      </Button>
      {/* Example button to edit an existing circle */}
      <Button variant="secondary" onClick={() => handleEditShow({ name: 'Existing Circle', userId: 1 })}>
        Edit Existing Circle
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Update Circle' : 'Create Circle'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="circleName" className="form-label">Circle Name</label>
              <input
                type="text"
                className="form-control"
                id="circleName"
                value={circleName}
                onChange={handleCircleNameChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="circleUsers" className="form-label">Select User</label>
              <select
                className="form-control"
                id="circleUsers"
                value={selectedUser}
                onChange={handleSelectedUserChange}
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isEditing ? (
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Circles;
