import type { BoardType } from "@/types/boardType";

const LOCAL_STORAGE_KEY = "Boards";

export interface BoardState {
  Boards: BoardType[];
}

export function setToAPI(board: BoardState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(board));
}

export function getFromAPI() {
  const savedBoards = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedBoards = savedBoards ? JSON.parse(savedBoards) : { Boards: [] };
  return parsedBoards;
}
