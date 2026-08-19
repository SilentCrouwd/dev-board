import { useBoardContext } from "@/Context/BoardContext";
import { CircleUserRound, LayoutDashboard } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

function Root() {
  const BoardContext = useBoardContext();
  return (
    <div>
      <nav className="bg-foreground border-b border-b-primary">
        <div className="lg:max-w-250 flex justify-between px-5 mx-auto h-fit">
          <Link to={"/boards"}>
            <p className=" text-primary font-bold text-lg py-5 flex gap-2 ">
              <LayoutDashboard className="text-primary w-4" />
              DevBoard
            </p>
          </Link>
          <Link to={"/profile"} className="flex items-center">
            <p className="text-muted flex  gap-2">
              <CircleUserRound className="w-5" />
              {BoardContext.state.User?.Username || "Nutzer"}
            </p>
          </Link>
        </div>
      </nav>

      <Outlet></Outlet>
    </div>
  );
}

export default Root;
