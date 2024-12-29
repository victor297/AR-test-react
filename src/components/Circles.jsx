import { Outlet, useLocation } from "react-router-dom";
import CircleListScreen from "../screens/CircleListScreen";
function Circles() {
  const location = useLocation();

  const isCreating = location.pathname.endsWith("create");
  const isAssigning = location.pathname.endsWith("assign");

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      {!isCreating && !isAssigning && (
        <>
          <CircleListScreen />
        </>
      )}
      {(isCreating || isAssigning) && <Outlet />}
    </div>
  );
}

export default Circles;
