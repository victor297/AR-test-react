import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useCreateUser } from "../features/auth/useCreateUser";
import Loader from "../components/Loader";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

function CreateUserModal(props) {
  // const rawToken = localStorage.getItem("accessToken");
  const { createUser, isLoading, isError } = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit({
    email,
    name,
    password,
    mobileNumber,
    role,
  }) {
    createUser(
      { email, name, password, mobileNumber, role },
      {
        onSuccess: () => {
          console.log("reached here again");
          reset();
        },
      }
    );
  }

  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Create User
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="Name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            {...register("name", {
              required: "This field is required",
            })}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </Form.Group>

        <Form.Group controlId="Email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "This field is required",
            })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </Form.Group>

        <Form.Group controlId="MobileNumber" className="my-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mobile Number"
            {...register("mobileNumber", {
              required: "This field is required",
            })}
          />
          {errors.mobileNumber && <p style={{ color: 'red' }}>{errors.mobileNumber.message}</p>}
        </Form.Group>

        <Form.Group controlId="Password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "This field is required",
            })}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </Form.Group>

        <Form.Group controlId="Role" className="my-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            {...register("role", { required: "Role is required" })}
          >
            <option value="">Select Role</option>
            <option value="circle">Circle</option>
            <option value="region">Region</option>
            <option value="survey-app">Survey App</option>
            <option value="state">State</option>
          </Form.Control>
          {errors.role && <p style={{ color: 'red' }}>{errors.role.message}</p>}
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="w-100 mt-2"
          disabled={isLoading}
        >
          Submit
        </Button>

        {isLoading && <Loader />}
        {isError && <p style={{ color: 'red' }}>Failed to create user. Please try again.</p>}
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
  );
}
export default CreateUserModal;
