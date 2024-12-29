import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 bg-dark">
          <div className="d-flex flex-column flex-md-row align-items-center px-3 pt-2 text-white">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-0 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder">DASHBOARD</span>
            </Link>
            <ul className="nav nav-pills mb-md-0">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link text-white">
                  <i className="fs-4 bi-house"></i>
                  <span className="ms-2">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/users" className="nav-link text-white">
                  <i className="fs-4 bi-person"></i>
                  <span className="ms-2">Users</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard/circles" className="nav-link text-white">
                  <i className="fs-4 bi-circle"></i>
                  <span className="ms-2">Circles</span>
                </Link>
              </li>
              <li className="nav-item" >
                <Link className="nav-link text-white">
                  <i className="fs-4 bi-power"></i>
                  <span className="ms-2">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>GST Nextbewe Project</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
