import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DetailCardProps, Task } from "@/types/boardType";

import { useEffect, useState } from "react";
import BoardTask from "./BoardTask";
import BoardDetailDialog from "./BoardDetailDialog";
import { useBoardContext } from "@/Context/BoardContext";

import { setToAPI } from "@/Hooks/StorageAPI";
import { useParams } from "react-router-dom";

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

function BoardDetailCard({ cardTitle, board }: Readonly<DetailCardProps>) {
  const BoardContext = useBoardContext();
  const { id } = useParams();

  const currentBoard =
    BoardContext.state.Boards.find((b) => b.boardId === id) ?? board;

  const filterColumns = currentBoard.task.filter(
    (currTask) => currTask.taskStatus === cardTitle,
  );

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function isColumInTask(startColumn: string) {
    const isStartColumn = startColumn !== cardTitle.toLowerCase();

    return isStartColumn;
  }
  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    const dragedColumn = getIdFromDraggedItem(event.dataTransfer, "title");
    if (dragedColumn) {
      setIsDraggingOver(isColumInTask(dragedColumn));
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDraggingOver(false);

    const taskId = getIdFromDraggedItem(event.dataTransfer, "id");

    if (id && taskId) {
      BoardContext.dispatch({
        type: "UPDATE_TASK_STATUS",
        payload: { boardId: id, taskId: String(taskId), columnName: cardTitle },
      });
    }
  }

  function handleAddTask(currTask: Task, id: string) {
    BoardContext.dispatch({
      type: "ADD_TASK",
      payload: { task: currTask, boardId: id },
    });
  }

  useEffect(() => {
    setToAPI(BoardContext.state);
  }, [BoardContext.state]);

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
      <CardHeader className="items-center justify-between flex">
        <CardTitle>
          {cardTitle}
          <span className="text-xs text-muted"> {filterColumns.length}</span>
        </CardTitle>
        <CardAction>
          <BoardDetailDialog
            handleAddTask={handleAddTask}
            taskStatus={cardTitle}
            currUser={BoardContext.state.User.Username || "Nutzer"}
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
      </CardFooter>
    </Card>
  );
}

export default BoardDetailCard;
