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
    return !task.some((task) => task.taskId === id);
  }
  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    const taskId = event.dataTransfer.getData("taskId");
    if (isIdInTasks(taskId)) {
      setIsDraggingOver(false);
    } else {
      setIsDraggingOver(true);
    }
  }


  // muss noch umgebaut werden auf Namen der Spalte
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const taskId = event.dataTransfer.getData("taskId");
    if (isIdInTasks(taskId)) {
      setIsDraggingOver(false);
    } else {
      // ich hab nix gecheckt
    }
  }
  return (
    <Card
      className={`border gap-0 bg-transparent ${isDraggingOver && "border-blue-500"} `}
      onDrop={handleDrop}
      onDragEnter={handleDragHover}
      onDragLeave={() => setIsDraggingOver(false)}
      onDragOver={handleDragHover}
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
      <CardFooter className="bg-transparent flex flex-col justify-center items-center min-h-25 gap-5">
        <div
          className={`border w-full text-primary text-center border-primary p-2 border-dashed ${!isDraggingOver && "hidden"}`}
        >
          hier ablegen
        </div>
        {filterColumns(cardTitle).map((currTask) => {
          return (
            <BoardTask
              taskId={currTask.taskId}
              key={currTask.taskId}
              taskDescription={currTask.taskDescription}
              taskTitle={currTask.taskTitle}
            />
          );
        })}
      </CardFooter>
    </Card>
  );
}
export default BoardDetailCard;
