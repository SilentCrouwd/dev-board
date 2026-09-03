import { BoardCRUD, type BoardAction } from "@/Hooks/BoardCRUDReducer";
import { getBoardsFromDB, insertBoardsToDb } from "@/Hooks/StorageAPI";
import type { BoardDb } from "@/types/boardType";
import { createContext, useEffect, useReducer, type ReactNode } from "react";

export interface BoardContextType {
  state: BoardDb[];
  dispatch: React.Dispatch<BoardAction>;
}

interface BoardProviderProps {
  children: ReactNode;
}

export const BoardContext = createContext<BoardContextType | undefined>(
  undefined,
);

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const [state, dispatch] = useReducer(BoardCRUD, []);

  useEffect(() => {
    const fetchDatenDb = async () => {
      const response = await getBoardsFromDB();
      dispatch({ type: "SET", payload: response });
    };
    fetchDatenDb();
  }, []);


  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};
