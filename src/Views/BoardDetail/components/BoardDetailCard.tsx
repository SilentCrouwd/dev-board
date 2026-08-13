import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DetailCardProps } from "@/types/boardType";

import { useEffect, useState } from "react";
import BoardTask from "./BoardTask";
import BoardDetailDialog from "./BoardDetailDialog";
import { useBoardContext } from "@/Context/BoardContext";
import type { Task } from "@/Hooks/BoardCRUDReducer";
import { setToAPI } from "@/Hooks/StorageAPI";
import { useParams } from "react-router-dom";

function getIdFromDraggedItem(dataTransfer: DataTransfer): string | null {
  let column: string | null = null;
  dataTransfer.types.forEach((type) => {
    if (type.startsWith("id-")) {
      column = type.replace("id-", "");
    }
  });
  return column;
}

function BoardDetailCard({
  cardTitle,
  statusValue,
  task,
}: Readonly<DetailCardProps>) {
  const BoardContext = useBoardContext();
  const { id } = useParams();
  const filterColumns = task.filter(
    (currTask) => currTask.taskStatus === cardTitle,
  );

  const [isDraggingOver, setIsDraggingOver] = useState(false);
  function isIdInTasks(column: string) {
    return column === cardTitle;
  }
  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const column = getIdFromDraggedItem(event.dataTransfer) ?? "";

    if (isIdInTasks(column)) {
      setIsDraggingOver(false);
    } else {
      setIsDraggingOver(true);
    }
  }

  // muss noch umgebaut werden auf Namen der Spalte
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const column = getIdFromDraggedItem(event.dataTransfer) ?? "";

    if (isIdInTasks(column)) {
      setIsDraggingOver(false);
    } else {
      //Placehodler
    }
  }
  function handleLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    // Note for me: Das ist wichtig damit nicht beim überfahren des Kinder Elements geflackert wird
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDraggingOver(false);
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
      className={`border gap-0 bg-transparent ${isDraggingOver && "border-blue-500"} `}
      onDrop={handleDrop}
      onDragEnter={handleDragHover}
      onDragLeave={() => setIsDraggingOver(false)}
      onDragOver={handleDragHover}
      onDragEnd={() => setIsDraggingOver(false)}
    >
      <CardHeader className=" items-center justify-between flex">
        <CardTitle className="">
          {cardTitle}
          <span className="text-xs text-muted"> {statusValue ?? 0}</span>
        </CardTitle>
        <CardAction>
          <BoardDetailDialog
            handleAddTask={handleAddTask}
            taskStatus={cardTitle}
          />
        </CardAction>
      </CardHeader>
      <CardFooter className="bg-transparent flex flex-col justify-center items-center min-h-25 gap-5 relative">
        <div
          // Pointer-Events-None verhindern das Flackern ebenfalls
          className={`border w-full text-primary text-center border-primary p-2 border-dashed absolute top-10 pointer-events-none ${!isDraggingOver && "hidden"}`}
        >
          hier ablegen
        </div>
        {filterColumns.map((currTask) => {
          return (
            <BoardTask
              key={currTask.taskId}
              task={currTask}
              handleDelTask={handleDelTask}
            />
          );
        })}
      </CardFooter>
    </Card>
  );
}
export default BoardDetailCard;
