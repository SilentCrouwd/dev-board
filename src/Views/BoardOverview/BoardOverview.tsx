import { useBoardContext } from "@/Hooks/useBoardContext";
import BoardCard from "./components/BoardCard";
import BoardDialog from "./components/BoardDialog";



function BoardOverview() {
  const BoardContext = useBoardContext();

  return (
    <div className="flex flex-col  ">
      <div className="w-full flex justify-between items-center px-5 mt-5 lg:max-w-[1000px] mx-auto">
        <h2 className=" text-2xl font-bold">Meine Boards</h2>
        <BoardDialog />
      </div>
      <div className="w-full flex justify-between items-center px-5 mt-5 lg:max-w-[1000px] mx-auto">
        {BoardContext.state.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3 w-full ">
            {BoardContext.state.map((currBoard) => {
              return (
                <BoardCard
                  key={currBoard.boardId}
                  boardTitle={currBoard.boardTitle}
                  taskValue={"2"}
                  boardId={String(currBoard.boardId)}
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
