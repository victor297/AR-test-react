import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateCircle } from "../features/circles/useCreateCircle";
import CircleList from "./CircleList";
// import 'bootstrap/dist/css/bootstrap.min.css';

function CreateCircle() {
  const [name, setName] = useState("");
  const [circleName, setCircleName] = useState("");
  const [users, setUsers] = useState([]);

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { createCircle, isLoading } = useCreateCircle();

  // function onSubmit({ name, circleName }) {
  //   e.preventDefault();
  //   if (!circleName) return;

  //   createCircle(
  //     { circleName },
  //     {
  //       onSettled: () => {
  //         reset();
  //       },
  //     }
  //   );
  // }

  useEffect(() => {
    // Fetch users here, for now, we'll use a static list
    const usersList = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
      { id: 3, name: "User 3" },
    ];
    setUsers(usersList);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Create Circle</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="circleName" className="form-label">
                Circle Name
              </label>
              <input
                type="text"
                className="form-control"
                id="circleName"
                disabled={isLoading}
                {...register("circleName", {
                  required: "This field is required",
                })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="circleUsers" className="form-label">
                Select User
              </label>
              <select
                id="circleUsers"
                className={`form-control ${
                  errors.circleUser ? "is-invalid" : ""
                }`}
                {...register("circleUser", {
                  required: "This field is required",
                })}
              >
                <option value="">Select a User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.circleUser && (
                <div className="invalid-feedback">
                  {errors.circleUser.message}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary me-3">
              Save
            </button>
            <button type="submit" className="btn btn-success px-3">
              Edit
            </button>
          </form>
        </div>
      </div>
      <hr />
      <hr />

      <div className="row">
        <CircleList />
      </div>
    </div>
  );
}

export default CreateCircle;
