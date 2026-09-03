import { Button } from "@/components/ui/button";

import { GripVertical, Trash2 } from "lucide-react";
import BoardTaskDialog from "./BoardTaskDialog";

import { useBoardContext } from "@/Hooks/useBoardContext";

interface BoardTask {
  currBoardId: string;
  currTaskId: string;
  handleDelTask: (id: string) => void;
}
export interface UpdateTask {
  taskTitle: string;
  taskDescription: string;
  taskDeadline: string;
  taskUser: string;
}

function BoardTask({ handleDelTask, currTaskId, currBoardId }: BoardTask) {
  const BoardContext = useBoardContext();

  const currBoard = BoardContext.state.find(
    (board) => board.boardId === currBoardId,
  );

  const currTask = currBoard?.Task.find((task) => task.taskId === currTaskId);

  function handleUpdateTask(currUpdatedObj: UpdateTask) {
    BoardContext.dispatch({
      type: "UPDATE_TASK",
      payload: {
        boardId: currBoardId,
        taskId: currTaskId,
        updatedObj: currUpdatedObj,
      },
    });
  }

  if (!BoardContext.state) {
    return <div>KeinText</div>;
  } else {
    if (!currTask) {
      return <div>Keine Task Gefunden</div>;
    }
    return (
      <div
        className=" w-full border rounded-md p-5 bg-img-gradient  cursor-grab"
        draggable="true"
        onDragStart={(e) => {
          e.dataTransfer.setData(`id-${currTask ? currTask.taskId : ""}`, "");
          e.dataTransfer.setData(
            `title-${currTask ? currTask.status : ""}`,
            "",
          );
        }}
      >
        <div className="grid grid-cols-[1fr_8fr_1fr] items-center  ">
          <GripVertical />
          <div className="p-2">
            <BoardTaskDialog
              key={currTask.taskId}
              currTask={currTask}
              handleUpdate={handleUpdateTask}
              currUser={"Nutzer"}
            />
            <p className="text-md text-muted ">{currTask.description}</p>
            <p className="text-md text-muted italic">{currTask.user}</p>
            <p className="text-md text-red-600">{currTask.deadline}</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              handleDelTask(currTask.taskId);
            }}
            size={"icon-lg"}
            className="border-none text-muted bg-card hover:bg-card hover:text-red-700 "
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    );
  }
}
export default BoardTask;
