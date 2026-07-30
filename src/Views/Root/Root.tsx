import { Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <p>hier ist die Root</p>
      <Outlet></Outlet>
    </>
  );
}

export default Root;
