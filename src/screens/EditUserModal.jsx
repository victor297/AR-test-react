import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
function EditUserModal(props) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");

  const [Role, setRole] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form fields
    const validationErrors = {};
    if (!Name) {
      validationErrors.name = "Name is required";
    }
    if (!Email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      validationErrors.email = "Email is invalid";
    }
    if (!MobileNumber) {
      validationErrors.mobileNumber = "Mobile Number is required";
    }
    if (!Role) {
      validationErrors.role = "Role is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Clear previous errors if validation passes
    setErrors({});

    try {
      const response = await axios.post("/api/users", {
        Name,
        Email,
        MobileNumber,
        Role,
      });

      if (response.status === 201) {
        navigate("/success");
      }
    } catch (error) {
      setErrors({ submit: "Failed to submit. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <Form.Text className="text-danger">{errors.name}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="Email" className="my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <Form.Text className="text-danger">{errors.email}</Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="MobileNumber" className="my-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mobile Number"
              value={MobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            {errors.mobileNumber && (
              <Form.Text className="text-danger">
                {errors.mobileNumber}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="Role" className="my-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={Role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="admin">Circle</option>
              <option value="user">Region</option>
              <option value="guest">Survey App</option>
              <option value="guest">State</option>
            </Form.Control>
            {errors.role && (
              <Form.Text className="text-danger">{errors.role}</Form.Text>
            )}
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 mt-2"
            disabled={isLoading}
          >
            Update
          </Button>

          {isLoading && <div className="text-center mt-3">Loading...</div>}
          {errors.submit && (
            <div className="text-center text-danger mt-3">{errors.submit}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default EditUserModal;
