import { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap/";
import { useForm } from "react-hook-form";
import { useAssignCircle } from "../features/circles/useAssignCircle";
import { useGetCirclesAlone } from "../features/circles/useCircles";
import { useGetUsers } from "../features/users/useUser";
import Loader from "../components/Loader";
import { useUsersContext } from "../contexts/UsersContext";
import { useCirclesContext } from "../contexts/CirclesContext";

function AssignCircleModal(props) {
  const { register, formState, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { circles, isLoading: isUsersLoading } = useCirclesContext();
  const { users } = useUsersContext();
  // const {
  //   data: dataOfUsers,
  //   isLoading: isUsersLoading,
  //   error: usersError,
  // } = useGetUsers();
  const { assignCircleToUser, isLoading, isError } = useAssignCircle();
  const { data, isLoading: circlesLoading, error } = useGetCirclesAlone();

  function onSubmit({ circleName, nameOfUser }) {
    assignCircleToUser(
      { circleName, nameOfUser },
      {
        onSuccess: () => {
          console.log("code reached here at assign");
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
          Assign Circle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="circleName" className="my-3">
            <Form.Label>Circle Name</Form.Label>
            <Form.Control
              as="select"
              {...register("circleName", {
                required: "This field is required",
              })}
              disabled={circlesLoading}
            >
              <option value="">Select a Circle</option>
              {circles
                .filter((circle) => circles.length > 0)
                .map((circle) => (
                  <option key={circle._id} value={circle.name}>
                    {circle.name}
                  </option>
                ))}
            </Form.Control>
            {errors.circleName && (
              <p style={{ color: "red" }}>{errors.circleName.message}</p>
            )}
          </Form.Group>

          <Form.Group controlId="circleName" className="my-3">
            <Form.Label>Name Of User</Form.Label>
            <Form.Control
              as="select"
              {...register("nameOfUser", {
                required: " This field is required",
              })}
              disabled={isUsersLoading}
            >
              <option value="">Select a User</option>
              {users
                .filter((user) => !user.isAdmin)
                .map((user) => (
                  <option key={user._id} value={user.name}>
                    {user.name}
                  </option>
                ))}
            </Form.Control>
            {errors.circleName && (
              <p style={{ color: "red" }}>{errors.nameOfUser.message}</p>
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

          {isLoading && <Loader />}
          {isError && (
            <p style={{ color: "red" }}>
              Failed to assign circle to user. Please check your inputs
            </p>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default AssignCircleModal;
