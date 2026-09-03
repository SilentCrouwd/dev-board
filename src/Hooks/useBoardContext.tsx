import { useContext } from "react";
import { BoardContext } from "@/Context/BoardContext";

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error(
      "useBoardContext muss innerhalb eines BoardProviders verwendet werden.",
    );
  }

  return context;
};
