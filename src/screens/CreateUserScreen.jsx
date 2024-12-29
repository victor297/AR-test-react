import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const CreateUserScreen = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form fields
    const errors = {};
    if (!Name) {
      errors.name = "Name is required";
    }
    if (!Email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      errors.email = "Email is invalid";
    }
    if (!MobileNumber) {
      errors.mobileNumber = "Mobile Number is required";
    }
    if (!Password) {
      errors.password = "Password is required";
    }
    if (!Role) {
      errors.role = "Role is required";
    }
    setErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:3000/auth/add_category", {
          Name,
          Email,
          MobileNumber,
          Password,
          Role,
        })
        .then((result) => {
          setIsLoading(false);
          if (result.data.Status) {
            alert("Form submitted successfully!"); // Display alert message
            navigate("/dashboard/category");
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-4 min-vh-100">
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <div className="p-3 rounded border">
            <h2 className="text-center">Add Users</h2>
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

              <Form.Group controlId="Password" className="my-3">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </div>
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password}
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
                Submit
              </Button>

              {isLoading && <div className="text-center mt-3">Loading...</div>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUserScreen;
