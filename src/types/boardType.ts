import type { ReactNode } from "react";

export interface BoardType {
  boardTitle: string;
  boardId: string | number;
  task: BoardTaskProps[];
}

export interface BoardTaskProps {
  taskTitle: string;
  taskDescription: string;
  taskId?: string;
  taskStatus?: "todo" | "inProgress" | "Done";
}
export interface BoardCardProps {
  boardTitle: string;
  taskValue: string | number;
  boardId: number;
}
export interface DetailCardProps {
  cardTitle: "todo" | "inProgress" | "Done";
  statusValue?: number;
  task: BoardTaskProps[];
}

export interface User {
  userName: string;
  board: BoardType[];
}
