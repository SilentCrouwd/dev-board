import type { BoardType } from "@/types/boardType";

export interface BoardState {
  Boards: BoardType[];
}
export const initialState: BoardState = {
  Boards: [],
};
export type BoardAction =
  | { type: "ADD"; payload: BoardType }
  | { type: "DEL"; payload: string | number };

export function BoardCRUD(state: BoardState, action: any) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        Boards: [
          ...state.Boards,
          {
            boardTitle: action.payload,
            boardId: Date.now(),
            task: [],
          },
        ],
      };
    case "DEL":
      console.log("Gesamter State:", state);
      return {
        ...state,
        Boards: state.Boards.filter(
          (currBoards) => currBoards.boardId !== action.payload,
        ),
      };

    default:
      return state;
  }
}
