import {
  BoardCRUD,
  type BoardAction,
  type BoardState,
} from "@/Hooks/BoardCRUDReducer";
import { getFromAPI, setToAPI } from "@/Hooks/StorageAPI";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react"; // 👈 useContext & ReactNode hinzugefügt

export interface BoardContextType {
  state: BoardState;
  dispatch: React.Dispatch<BoardAction>;
}

interface BoardProviderProps {
  children: ReactNode;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const [state, dispatch] = useReducer(BoardCRUD, getFromAPI());

  useEffect(() => {
    setToAPI(state);
  }, [state]);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error(
      "useBoardContext muss innerhalb eines BoardProviders verwendet werden.",
    );
  }

  return context;
};
