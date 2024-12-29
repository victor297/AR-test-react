import { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

function AssignCircle() {
  const [roles, setRoles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCircle, setSelectedCircle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch roles and circles here, for now, we'll use static lists
    const rolesList = [
      { id: 1, name: "Admin" },
      { id: 2, name: "Moderator" },
      { id: 3, name: "Member" },
    ];
    setRoles(rolesList);

    const circlesList = [
      { id: 1, name: "Circle 1" },
      { id: 2, name: "Circle 2" },
      { id: 3, name: "Circle 3" },
    ];
    setCircles(circlesList);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving", { selectedRole, selectedCircle });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updating", { selectedRole, selectedCircle });
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title">Assign Circle</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="roleSelect" className="form-label">
                    Assign User
                  </label>
                  <select
                    className="form-control"
                    id="roleSelect"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="">Select a User</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="roleSelect" className="form-label">
                    Assign Role
                  </label>
                  <select
                    className="form-control"
                    id="roleSelect"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="circleSelect" className="form-label">
                    Select Circle
                  </label>
                  <select
                    className="form-control"
                    id="circleSelect"
                    value={selectedCircle}
                    onChange={(e) => setSelectedCircle(e.target.value)}
                  >
                    <option value="">Select a circle</option>
                    {circles.map((circle) => (
                      <option key={circle.id} value={circle.id}>
                        {circle.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-success me-2"
                  onClick={handleSave}
                  disabled={isEditing}
                >
                  Assign
                </button>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={handleEdit}
                  disabled={isEditing}
                >
                  Manage
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title">Manage Circle</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="roleSelect" className="form-label">
                    Circle Name
                  </label>
                  <select
                    className="form-control"
                    id="roleSelect"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="">Select a Circle</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="circleSelect" className="form-label">
                    Select Employee
                  </label>
                  <select
                    className="form-control"
                    id="circleSelect"
                    value={selectedCircle}
                    onChange={(e) => setSelectedCircle(e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    {circles.map((circle) => (
                      <option key={circle.id} value={circle.id}>
                        {circle.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary me-2"
                  onClick={handleSave}
                  disabled={isEditing}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-success me-2"
                  onClick={handleEdit}
                  disabled={isEditing}
                >
                  Edit
                </button>
                <button
                  type="submit"
                  className="btn btn-warning"
                  onClick={handleUpdate}
                  disabled={!isEditing}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignCircle;
