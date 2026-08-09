import type { BoardType } from "@/types/boardType";

export interface BoardState {
  Boards: BoardType[];
}
export const initialState = { Boards: [] };
export type BoardAction = { type: "ADD"; payload: BoardType };

export function BoardCRUD(state: BoardState, action: any) {
  switch (action.type) {
    case "ADD":
      return { ...state, Boards: [...state.Boards, action.payload] };

    default:
      return state;
  }
}
