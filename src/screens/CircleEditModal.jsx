import React from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Modal, Button, Form } from "react-bootstrap";
import { useEditCircle } from "../features/circles/useEditCircle";

const CircleEditModal = ({ show, handleClose, circle }) => {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  // Search params
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("edit");

  //React Query
  const { editCircle, isLoading, isError } = useEditCircle();

  function onSubmit({ id, nameOfUser }) {
    editCircle(
      { id, nameOfUser },
      {
        onSuccess: () => {
          console.log("code reached here at assign");
          reset();
          handleClose();
        },
      }
    );
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Circle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="circleName">
            <Form.Label>Circle Name</Form.Label>
            <Form.Control
              type="text"
            {...register("circleName")}
              placeholder="Enter Circle Name"
            />
             {errors.circleName && <p style={{ color: 'red' }}>{errors.circleName.message}</p>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" variant="info" disabled={isLoading}>
          Update
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CircleEditModal;
