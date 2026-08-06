import type { ReactNode } from "react";

export interface BoardType {
  boardTitle: string;
  boardId: string | number;
  task: BoardTaskProps[];
}

export interface BoardTaskProps {
  taskTitle: string;
  taskDescription: string;
  taskId?: number | string;
  taskStatus?: "todo" | "inProgress" | "Done";
}
export interface BoardCardProps {
  boardTitle: string;
  taskValue: string | number;
  boardId: string | number;
}
export interface DetailCardProps {
  cardTitle: "todo" | "inProgress" | "Done";
  statusValue?: number;
  tasksCard?: ReactNode[];
}
