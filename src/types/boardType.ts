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
