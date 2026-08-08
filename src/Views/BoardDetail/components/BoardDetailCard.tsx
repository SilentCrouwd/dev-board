import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DetailCardProps } from "@/types/boardType";
import { Plus } from "lucide-react";
import { useState } from "react";
import BoardTask from "./BoardTask";

function BoardDetailCard({
  cardTitle,
  statusValue,
  task,
}: Readonly<DetailCardProps>) {
  function filterColumns(taskStatus: string) {
    const filteredTask = task.filter(
      (currTask) => currTask.taskStatus === taskStatus,
    );
    return filteredTask;
  }
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  function isIdInTasks(id: string) {
    return task.some((task) => task.taskId === id);
  }
  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    const taskId = event.dataTransfer.getData("taskId");
    event.preventDefault();

    if (isIdInTasks(String(taskId))) {
      setIsDraggingOver(false);
    } else {
      setIsDraggingOver(true);
    }
  }

  // muss noch umgebaut werden auf Namen der Spalte
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const taskId = event.dataTransfer.getData("taskId");
    console.log(taskId);
    if (isIdInTasks(taskId)) {
      setIsDraggingOver(false);
    } else {
      setIsDraggingOver(false);
    }
  }
  function handleLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    // Note for me: Das ist wichtig damit nicht beim überfahren des Kinder Elements geflackert wird
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setIsDraggingOver(false);
    }
  }
  return (
    <Card
      className={`border gap-0 bg-transparent ${isDraggingOver && "border-blue-500"} `}
      onDrop={handleDrop}
      onDragEnter={() => setIsDraggingOver(true)}
      onDragLeave={handleLeave}
      onDragOver={handleDragHover}
      onDragEnd={() => setIsDraggingOver(false)}
    >
      <CardHeader className=" items-center justify-between flex">
        <CardTitle className="">
          {cardTitle}
          <span className="text-xs text-muted"> {statusValue ?? 0}</span>
        </CardTitle>
        <CardAction>
          <Button className="bg-transparent text-main hover:cursor-pointer">
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="bg-transparent flex flex-col justify-center items-center min-h-25 gap-5 relative">
        <div
          // Pointer-Events-None verhindern das Flackern ebenfalls
          className={`border w-full text-primary text-center border-primary p-2 border-dashed absolute top-10 pointer-events-none ${!isDraggingOver && "hidden"}`}
        >
          hier ablegen
        </div>
        {filterColumns(cardTitle).map((currTask) => {
          return (
            <BoardTask
              key={currTask.taskId}
              taskDescription={currTask.taskDescription}
              taskTitle={currTask.taskTitle}
              taskStatus={currTask.taskStatus}
            />
          );
        })}
      </CardFooter>
    </Card>
  );
}
export default BoardDetailCard;
