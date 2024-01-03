import "../Navigation.css";
import { Outlet, Link } from "react-router-dom";

export default function Navigation({ userUpdate }) {
  const [, setter] = userUpdate;
  return (
    <div className="nav">
      <h2
        style={{
          color: "white",
          fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif`,
        }}
      >
        Employee Details
      </h2>
      <ul>
        <li
          style={{
            backgroundColor: "#7c7b77",
            borderRadius: "5px",
            margin: "5px",
            width: "100px",
          }}
        >
          <Link to="/">Insert</Link>
        </li>
        <li
          style={{
            backgroundColor: "#7c7b77",
            borderRadius: "5px",
            margin: "5px",
            width: "100px",
          }}
        >
          <Link onClick={() => setter({})} to="/display">
            Display
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
