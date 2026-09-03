import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BoardDb } from "@/types/boardType";

import { useState } from "react";
import BoardTask from "./BoardTask";
import BoardDetailDialog from "./BoardDetailDialog";
import { useBoardContext } from "@/Hooks/useBoardContext";

import { useParams } from "react-router-dom";
import { upsertTasksToDb } from "@/Hooks/StorageAPI";

function getIdFromDraggedItem(
  dataTransfer: DataTransfer,
  key: string,
): string | null {
  let taskId: string | null = null;
  dataTransfer.types.forEach((type) => {
    if (type.startsWith(`${key}-`)) {
      taskId = type.replace(`${key}-`, "");
    }
  });
  return taskId;
}
export interface DetailCardProps {
  columnTitle: "ToDo" | "inProgress" | "Done";
  statusValue?: number;
  board: BoardDb;
}
function BoardDetailCard({ columnTitle, board }: Readonly<DetailCardProps>) {
  const BoardContext = useBoardContext();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const { id } = useParams();
  //  check is taskStatus = column name
  const currentBoard = BoardContext.state.find((board) => board.boardId === id);

  const filterColumns =
    currentBoard?.Task.filter((currTask) => currTask.status === columnTitle) ??
    [];

  // check is dragged Task Status = columnName
  function isColumInTask(startColumn: string) {
    const isStartColumn = startColumn !== columnTitle.toLowerCase();

    return isStartColumn;
  }
  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    const draggedColumn = getIdFromDraggedItem(event.dataTransfer, "title");
    if (draggedColumn) {
      setIsDraggingOver(isColumInTask(draggedColumn));
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDraggingOver(false);

    const taskId = getIdFromDraggedItem(event.dataTransfer, "id");

    if (id && taskId) {
      BoardContext.dispatch({
        type: "UPDATE_TASK_STATUS",
        payload: {
          boardId: id,
          taskId: String(taskId),
          columnName: columnTitle,
        },
      });
    }
  }

  async function handleAddTask(currTask: BoardDb["Task"][number], id: string) {
    BoardContext.dispatch({
      type: "ADD_TASK",
      payload: { task: currTask, boardId: id },
    });
    await upsertTasksToDb(currTask);
  }

  function handleDelTask(taskId: string) {
    if (id) {
      BoardContext.dispatch({
        type: "DEL_TASK",
        payload: { boardId: id, taskId },
      });
    }
  }

  return (
    <Card
      className={`border gap-0 bg-transparent ${isDraggingOver ? "border-blue-500" : ""}`}
      onDrop={handleDrop}
      onDragEnter={handleDragHover}
      onDragLeave={() => setIsDraggingOver(false)}
      onDragOver={handleDragHover}
      onDragEnd={() => setIsDraggingOver(false)}
    >
      <CardHeader className="items-center justify-between flex bg-img-gradient">
        <CardTitle>
          {columnTitle}
          <span className="text-xs text-muted"> {filterColumns.length}</span>
        </CardTitle>
        <CardAction>
          <BoardDetailDialog
            handleAddTask={handleAddTask}
            taskStatus={columnTitle}
            currUser={"nutzer"}
          />
        </CardAction>
      </CardHeader>
      <CardFooter className="bg-transparent flex flex-col justify-center items-center min-h-25 gap-5 relative">
        <div
          className={`border w-full text-primary text-center border-primary p-2 border-dashed absolute top-10 pointer-events-none ${!isDraggingOver ? "hidden" : ""}`}
        >
          hier ablegen
        </div>
        {filterColumns.map((currTask) => (
          <BoardTask
            key={currTask.taskId}
            currTaskId={currTask.taskId}
            handleDelTask={handleDelTask}
            currBoardId={String(id)}
          />
        ))}
        {filterColumns.length === 0 ? (
          <p className="text-popover-foreground">Keine Task vorhanden</p>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
}

export default BoardDetailCard;
