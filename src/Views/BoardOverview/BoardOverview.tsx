import { useEffect, useReducer, useState } from "react";
import BoardCard from "./components/BoardCard";
import BoardDialog from "./components/BoardDialog";
import { BoardCRUD } from "@/Hooks/BoardCRUDReducer";
import { getFromAPI, setToAPI } from "@/Hooks/StorageAPI";
function BoardOverview() {
  const [state, dispatch] = useReducer(BoardCRUD, getFromAPI());

  function handleAddBoard(boardName: any) {
    dispatch({ type: "ADD", payload: boardName });
  }

  //  hier muss das dispatch durchgereicht werden
  useEffect(() => {
    setToAPI(state);
  }, [state]);
  return (
    <div className="flex flex-col  ">
      <div className="w-full flex justify-between items-center px-5 mt-5 lg:max-w-[1000px] mx-auto">
        <h2 className=" text-2xl font-bold">Meine Boards</h2>
        <BoardDialog handleAddBoard={handleAddBoard} />
      </div>
      <div className="w-full flex justify-between items-center px-5 mt-5 lg:max-w-[1000px] mx-auto">
        {state.Boards.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 w-full ">
            {state.Boards.map((currBoard) => {
              return (
                <BoardCard
                  key={currBoard.boardId}
                  boardTitle={currBoard.boardTitle}
                  taskValue={currBoard.task?.length ?? 0}
                  boardId={Number(currBoard.boardId)}
                />
              );
            })}
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
