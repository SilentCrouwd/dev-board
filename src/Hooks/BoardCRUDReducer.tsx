import type { BoardTaskProps, BoardType } from "@/types/boardType";

export interface BoardState {
  Boards: BoardType[];
}
export interface TaskState {
  Task: BoardTaskProps[];
}

export interface Task {
  taskTitle: string;
  taskDescription: string;
  taskId: string | number;
  taskStatus: "todo" | "inProgress" | "Done";
}

export type BoardAction =
  | { type: "ADD"; payload: string }
  | { type: "DEL"; payload: string | number }
  | { type: "UPDATE"; payload: { id: string; value: string } }
  | {
      type: "ADD_TASK";
      payload: { boardId: string; task: Task };
    };

export function BoardCRUD(state: BoardState, action: BoardAction) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        Boards: [
          ...state.Boards,
          {
            boardTitle: action.payload,
            boardId: String(Date.now()),
            task: [],
          },
        ],
      };
    case "DEL":
      return {
        ...state,
        Boards: state.Boards.filter(
          (currBoards) => currBoards.boardId !== action.payload,
        ),
      };

    case "UPDATE":
      return {
        ...state,
        Boards: state.Boards.map((board) =>
          board.boardId === action.payload.id
            ? { ...board, boardTitle: action.payload.value }
            : board,
        ),
      };

    case "ADD_TASK":
      return {
        ...state,
        Boards: state.Boards.map((board) =>
          board.boardId === action.payload.boardId
            ? { ...board, task: [...board.task, action.payload.task] }
            : board,
        ),
      };

    default:
      return state;
  }
}
