import type { BoardState } from "./BoardCRUDReducer";

const LOCAL_STORAGE_KEY = "Boards";

export function setToAPI(board: BoardState) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(board));
}

export function getFromAPI() {
  const savedBoards = localStorage.getItem(LOCAL_STORAGE_KEY);
  const parsedBoards = savedBoards
    ? JSON.parse(savedBoards)
    : { Boards: [], User: { Username: "Nutzer", UserId: String(Date.now()) } };
  return parsedBoards;
}
