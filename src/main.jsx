import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";

import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";
// import PrivateRoute from "./components/PrivateRoute";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./store";
import LoginScreen from "./screens/LoginScreen";
import Home from "./components/Home";
import Users from "./components/Users";
import CreateUserScreen from "./screens/CreateUserScreen.jsx";
import UserEditScreen from "./screens/UserEditScreen.jsx";
import Circles from "./components/Circles.jsx";
import CreateCircle from "./components/CreateCircle.jsx";
import AssignCircle from "./components/AssignCircle.jsx";
import Review from "./screens/ReviewScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="" element={<Home />}></Route>
        <Route path="/dashboard/users" element={<Users />}></Route>
        <Route path="/dashboard/review/:id" element={<Review />}></Route>

        <Route path="/dashboard/circles" element={<Circles />}>
          <Route path="create" element={<CreateCircle />} />
          {/* Nested route */}
          <Route path="assign" element={<AssignCircle />} />
          {/* Nested route */}
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
