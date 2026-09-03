import type { Database } from "./supabase";

export interface BoardType {
  boardTitle: string;
  boardId: string | number;
  task: BoardDb[];
}
export type BoardDb = Database["public"]["Tables"]["Boards"]["Row"] & {
  Task: Database["public"]["Tables"]["Task"]["Row"][];
};
export interface Tasks {
  taskTitle: string;
  taskDescription: string;
  taskId: string;
  taskStatus: string;
  taskDeadline: string;
  taskUser: string;
}
