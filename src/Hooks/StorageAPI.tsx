import { supabase } from "@/lib/supabase/supabaseClient";

import type { BoardDb } from "@/types/boardType";

// const LOCAL_STORAGE_KEY = "Boards";

// export function setToAPI(board: BoardState) {
//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(board));
// }

// export function getFromAPI() {
//   const savedBoards = localStorage.getItem(LOCAL_STORAGE_KEY);
//   const parsedBoards = savedBoards
//     ? JSON.parse(savedBoards)
//     : { Boards: [], User: { Username: "Nutzer", UserId: String(Date.now()) } };
//   return parsedBoards;
// }

export async function getBoardsFromDB(): Promise<BoardDb[]> {
  const { data, error } = await supabase.from("Boards").select("*,Task(*)");

  if (error) {
    console.log(error);
    return [];
  } else {
    return data;
  }
}

export async function insertBoardsToDb(
  boards: BoardDb,
): Promise<BoardDb | null> {
  const { data, error } = await supabase
    .from("Boards")
    .insert([{ boardTitle: boards.boardTitle }])
    .select("*,Task(*)")
    .single();

  if (error) {
    console.error("Fehler beim Einfügen:", error);
    return null;
  }

  return data;
}

export async function deleteFromDb(currId: string) {
  const { error } = await supabase
    .from("Boards")
    .delete()
    .eq("boardId", currId);
  if (error) {
    console.log("Beim Löschen ist ein Fehler unterlaufen " + error);
  }
}

export async function updateBoardsToDb(boardTitle: string, id: string) {
  const { data, error } = await supabase
    .from("Boards")
    .update({ boardTitle: boardTitle })
    .eq("boardId", id)
    .select();
  if (data) {
    console.log(data);
  } else {
    console.log(error);
  }
}

// Nutze ein Array als Typ für den Parameter
export async function upsertTasksToDb(tasks: BoardDb["Task"][number]) {
  const { taskId, ...rest } = tasks;

  const { data, error } = await supabase.from("Task").upsert(rest).select();

  if (error) {
    console.error("Fehler beim Upsert:", error);
    return null;
  }

  return data;
}
