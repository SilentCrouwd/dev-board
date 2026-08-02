import { useState } from "react";
import BoardCard from "./components/BoardCard";
import BoardDialog from "./components/BoardDialog";
import type { BoardType } from "@/types/boardType";
function BoardOverview() {
  const [board, setBoard] = useState<BoardType>({
    boardTitle: "hallo",
    Task: [{ taskTitle: "hallo2", taskDescription: "hir is ne beschreibung" }],
  });
  return (
    <div className="flex flex-col  ">
      <div className="w-full flex justify-between items-center px-2 mt-5 lg:max-w-[1000px] mx-auto">
        <h2 className=" text-2xl font-bold">Meine Boards</h2>
        <BoardDialog />
      </div>
      <div className="w-full flex justify-between items-center px-2 mt-5 lg:max-w-[1000px] mx-auto">
        {/* Hier ist eine Hilfs Variable sie wird ersetzt wenn die Logic fertig ist und fragt ab ob ein Eintrag vorhanden ist */}
        {board.boardTitle !== "" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 w-full p-2">
            <BoardCard
              boardTitle={board.boardTitle}
              taskValue={board.Task.length}
              handleDelete={() => {}}
              boardId={Date.now()}
            />
          </div>
        ) : (
          <p className="text-lg italic text-muted text-center">
            Noch keine Boards vorhanden<br></br>
            <span className="text-xs">
              Erstelle dein erstes Board,um loszulegen
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default BoardOverview;
