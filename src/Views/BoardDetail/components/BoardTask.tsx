import { Button } from "@/components/ui/button";
import type { BoardTaskProps } from "@/types/boardType";
import { GripVertical, Trash2 } from "lucide-react";

function BoardTask({ taskTitle, taskDescription, taskId }: BoardTaskProps) {
  return (
    <div
      className="dragCard w-full border rounded-md p-5 bg-card"
      draggable="true"
      onDragStart={(e) => e.dataTransfer.setData("taskId", taskId)}
    >
      <div className="grid grid-cols-[1fr_8fr_1fr] items-center  ">
        <GripVertical />
        <div>
          <p className="text-lg font-bold">{taskTitle}</p>
          <p className="text-md text-muted ">{taskDescription}</p>
        </div>
        <Button
          variant="ghost"
          size={"icon-lg"}
          className="border-none text-muted bg-card hover:bg-card hover:text-red-700 "
        >
          <Trash2 className="" />
        </Button>
      </div>
    </div>
  );
}

export default BoardTask;
