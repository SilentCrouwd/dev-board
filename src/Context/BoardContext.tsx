import { BoardCRUD, type BoardAction } from "@/Hooks/BoardCRUDReducer";
import { getBoardsFromDB } from "@/Hooks/StorageAPI";
import type { BoardDb } from "@/types/boardType";
import type { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useReducer, type ReactNode } from "react";

export interface BoardContextType {
  state: BoardDb[];
  dispatch: React.Dispatch<BoardAction>;
}

interface BoardProviderProps {
  children: ReactNode;
  session?: Session | null;
}

export const BoardContext = createContext<BoardContextType | undefined>(
  undefined,
);

export const BoardProvider = ({ children, session }: BoardProviderProps) => {
  const [state, dispatch] = useReducer(BoardCRUD, []);

  useEffect(() => {
    const fetchDatenDb = async () => {
      const response = await getBoardsFromDB();
      dispatch({ type: "SET", payload: response ?? [] });
    };

    if (session) {
      fetchDatenDb();
    } else {
      dispatch({ type: "SET", payload: [] });
    }
  }, [session]);
  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};
