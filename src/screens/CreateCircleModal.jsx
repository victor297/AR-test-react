import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateCircle } from "../features/circles/useCreateCircle";
import Loader from "../components/Loader";

function CreateCircleModal(props) {
  const [users, setUsers] = useState([]);

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { createCircle, isLoading, isError } = useCreateCircle();

  function onSubmit({circleName}) {
    createCircle({circleName}, {
      onSuccess: () => {
        console.log("reached here again");
        reset();
      },
    });
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
          Create Circle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="circleName" className="my-3">
            <Form.Label>Circle Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter A Meaningful Circle Name"
              {...register("circleName", {
                required: "This field is required",
              })}
            />
            {errors.circleName && (
              <p style={{ color: "red" }}>{errors.name.message}</p>
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
              Failed to create circle. Please try again.
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
export default CreateCircleModal;
