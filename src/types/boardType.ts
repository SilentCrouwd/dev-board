import type { ReactNode } from "react";

export interface BoardType {
  boardTitle: string;
  Task: BoardTaskProps[];
}

export interface BoardTaskProps {
  taskTitle: string;
  taskDescription: string;
}
export interface BoardCardProps {
  boardTitle: string;
  taskValue: string | number;
  boardId: string | number;
  handleDelete?: () => void;
}
export interface DetailCardProps {
  cardTitle: "todo" | "inProgress" | "Done";
  statusValue?: number;
  tasksCard?: ReactNode;
}
