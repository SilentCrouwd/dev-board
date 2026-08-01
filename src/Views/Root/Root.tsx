import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <p>hier ist die Root</p>
      <Outlet></Outlet>
    </div>
  );
}

export default Root;
