import { ArrowLeft, Pencil } from "lucide-react";
import BoardDetailCard from "./components/BoardDetalCard";
import { Link } from "react-router-dom";
function BoardDetail() {
  return (
    <div className="w-full flex flex-col justify-between items-center px-2 mt-5 lg:max-w-[1000px] mx-auto">
      <div className="flex w-full justify-start gap-10">
        <Link to="/boards">
          <ArrowLeft />
        </Link>

        <p className="font-bold text-xl">Tittle</p>

        <Pencil className="p-1" />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5">
        <BoardDetailCard status="Todo" />
        <BoardDetailCard status="in Progress" />
        <BoardDetailCard status="Done" />
      </div>
    </div>
  );
}
export default BoardDetail;
