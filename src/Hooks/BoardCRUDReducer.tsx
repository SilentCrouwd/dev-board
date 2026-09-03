import type { BoardDb } from "@/types/boardType";

// export interface BoardState {
//   User: {
//     Username: string;
//     UserId: string;
//   };
//   Boards: BoardType[];
// }
export interface TaskState {
  Task: BoardDb["Task"];
}
export type BoardAction =
  | { type: "ADD_USER"; payload: string }
  | { type: "ADD"; payload: BoardDb }
  | { type: "DEL"; payload: string }
  | { type: "UPDATE"; payload: { id: string; value: string } }
  | {
      type: "ADD_TASK";
      payload: { boardId: string; task: BoardDb["Task"][number] };
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
    }
  | {
      type: "UPDATE_TASK_STATUS";
      payload: {
        boardId: string;
        taskId: string;
        columnName: string;
      };
    }
  | { type: "SET"; payload: BoardDb[] };

export function BoardCRUD(state: BoardDb[], action: BoardAction) {
  switch (action.type) {
    case "ADD": {
      const newState = [...state, action.payload];

      return newState;
    }

    case "SET":
      return action.payload;
    case "DEL": {
      const newState = state.filter(
        (currBoards) => currBoards.boardId !== action.payload,
      );
      return newState;
    }

    case "UPDATE": {
      const newState = state.map((board) => {
        return board.boardId === action.payload.id
          ? { ...board, boardTitle: action.payload.value }
          : board;
      });

      return newState;
    }

    // return {
    //   ...state,
    //   Boards: state.Boards.map((board) =>
    //     board.boardId === action.payload.id
    //       ? { ...board, boardTitle: action.payload.value }
    //       : board,
    //   ),
    // };

    case "ADD_TASK": {
      const newState = state.map((board) => {
        return board.boardId === action.payload.boardId
          ? { ...board, Task: [...board.Task, action.payload.task] }
          : board;
      });
      return newState;
    }

    // return {
    //     ...state,
    //     Boards: state.Boards.map((board) =>
    //       board.boardId === action.payload.boardId
    //         ? { ...board, task: [...board.task, action.payload.task] }
    //         : board,
    //     ),
    //   };
    // // case "DEL_TASK":
    //   return {
    //     ...state,
    //     Boards: state.Boards.map((board) =>
    //       board.boardId === action.payload.boardId
    //         ? {
    //             ...board,
    //             task: board.task.filter(
    //               (t) => t.taskId !== action.payload.taskId,
    //             ),
    //           }
    //         : board,
    //     ),
    //   };

    // case "UPDATE_TASK":
    //   return {
    //     ...state,

    //     Boards: state.Boards.map((boards) =>
    //       boards.boardId === action.payload.boardId
    //         ? {
    //             ...boards,

    //             task: boards.task.map((task) =>
    //               task.taskId === action.payload.taskId
    //                 ? {
    //                     ...task,

    //                     ...action.payload.updatedObj,
    //                   }
    //                 : task,
    //             ),
    //           }
    //         : boards,
    //     ),
    //   };
    // case "UPDATE_TASK_STATUS": {
    //   return {
    //     ...state,
    //     Boards: state.Boards.map((board) =>
    //       board.boardId === action.payload.boardId
    //         ? {
    //             ...board,
    //             task: board.task.map((task) =>
    //               task.taskId === action.payload.taskId
    //                 ? { ...task, taskStatus: action.payload.columnName }
    //                 : task,
    //             ),
    //           }
    //         : board,
    //     ),
    //   };
    // }
    // case "ADD_USER":
    //   return {
    //     ...state,
    //     User: {
    //       ...state.User,
    //       Username: action.payload,
    //       UserId: String(Date.now()),
    //     },
    //   };

    default:
      return state;
  }
}
