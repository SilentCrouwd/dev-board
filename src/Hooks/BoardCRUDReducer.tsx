import type { BoardType } from "@/types/boardType";

export interface BoardState {
  Boards: BoardType[];
}

export type BoardAction =
  | { type: "ADD"; payload: string }
  | { type: "DEL"; payload: string | number }
  | { type: "UPDATE"; payload: { id: number; value: string } };

export function BoardCRUD(state: BoardState, action: BoardAction) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        Boards: [
          ...state.Boards,
          {
            boardTitle: action.payload,
            boardId: Date.now(),
            task: [
              {
                taskTitle: "test",
                taskDescription: "test",
                taskId: Date.now(),
                taskStatus: "todo",
              },
            ],
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

    default:
      return state;
  }
}
