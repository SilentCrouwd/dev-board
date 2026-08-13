export interface BoardType {
  boardTitle: string;
  boardId: string | number;
  task: BoardTaskProps[];
}

export interface BoardTaskProps {
  taskTitle: string;
  taskDescription: string;
  taskId: string;
  taskStatus: string;
  taskDeadline: string;
  taskUser: string;
}
export interface BoardCardProps {
  boardTitle: string;
  taskValue: string | number;
  boardId: string;
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
