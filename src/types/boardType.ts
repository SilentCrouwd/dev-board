export interface BoardType {
  boardTitle: string;
  boardId: string | number;
  task: Task[];
}

export interface Task {
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
  cardTitle: "ToDo" | "inProgress" | "Done";
  statusValue?: number;
  board: BoardType;
}
