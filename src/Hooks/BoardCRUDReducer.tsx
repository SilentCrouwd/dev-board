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
  taskId: string;
  taskStatus: "todo" | "inProgress" | "Done";
}

export type BoardAction =
  | { type: "ADD"; payload: string }
  | { type: "DEL"; payload: string | number }
  | { type: "UPDATE"; payload: { id: string; value: string } }
  | {
      type: "ADD_TASK";
      payload: { boardId: string; task: Task };
    }
  | { type: "DEL_TASK"; payload: { boardId: string; taskId: string } }
  | {
      type: "UPDATE_TASK";
      payload: {
        boardId: string;
        taskId: string;
        updatedObj: {
          taskTitle: string;
          taskDescription: string;
          taskDeadline: string;
          taskUser: string;
        };
      };
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
    case "DEL_TASK":
      return {
        ...state,
        Boards: state.Boards.map((board) =>
          board.boardId === action.payload.boardId
            ? {
                ...board,
                task: board.task.filter(
                  (t) => t.taskId !== action.payload.taskId,
                ),
              }
            : board,
        ),
      };


    case "UPDATE_TASK":
      return {
        ...state,

        Boards: state.Boards.map((boards) =>
          boards.boardId === action.payload.boardId
            ? {
                ...boards,

                task: boards.task.map((task) =>
                  task.taskId === action.payload.taskId
                    ? {
                        ...task,

                        ...action.payload.updatedObj,
                      }
                    : task,
                ),
              }
            : boards,
        ),
      };
    default:
      return state;
  }
}
