import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
// import { useLoginMutation } from "../slices/usersApiSlice";
// import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useLogin } from "../features/auth/useLogin";
import { useAuthContext } from "../contexts/AuthContext";

const LoginScreen = () => {
  const { dispatch } = useAuthContext();
  const { login, isLoading, isError } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit({ email, password }) {
    try {
      login(
        { email, password },
        {
          onSuccess: (resp) => {
            console.log("reached here");
            dispatch({ type: "login", payload: resp });
            reset();
          },
        }
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <FormContainer>
      <h1 className="fw-bold">Login</h1>

      <Form onSubmit={handleSubmit(onSubmit)} className="container-fluid">
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...register("password", { required: "This field is required" })}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Login
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
