import { Button } from "@/components/ui/button";
import type { BoardTaskProps } from "@/types/boardType";

import { GripVertical, Trash2 } from "lucide-react";
import BoardTaskDialog from "./BoardTaskDialog";

interface BoardTask {
  task: BoardTaskProps;
  handleDelTask: (id: string) => void;
}

function BoardTask({ task, handleDelTask }: BoardTask) {
  //  Hier muss eine HandleUpdate fn
  //dispatch fn als callback
  // maybe useContext

  if (!task) {
    return <div>KeinText</div>;
  } else {
    return (
      <div
        className=" w-full border rounded-md p-5 bg-card  cursor-grab"
        draggable="true"
        onDragStart={(e) => {
          e.dataTransfer.setData(`id-${task.taskStatus}`, "");
        }}
      >
        <div className="grid grid-cols-[1fr_8fr_1fr] items-center  ">
          <GripVertical />
          <div className="p-2">
            <BoardTaskDialog currTask={task} />
            <p className="text-md text-muted ">{task.taskDescription}</p>
            <p className="text-md text-muted italic">{task.taskUser}</p>
            <p className="text-md text-red-600">{task.taskDeadline}</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              handleDelTask(task.taskId);
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
