import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";

import { useState } from "react";
import { useBoardContext } from "@/Hooks/useBoardContext";
import { deleteFromDb } from "@/Hooks/StorageAPI";
export interface BoardCardProps {
  boardTitle: string;
  taskValue: string | number;
  boardId: string;
}
function BoardCard({
  boardTitle,
  taskValue,
  boardId,
}: Readonly<BoardCardProps>) {
  const BoardContext = useBoardContext();
  const [toggleDELContext, setToggleDELContext] = useState(false);

  async function handleDeleteBoard() {
    try {
      await deleteFromDb(boardId);
      BoardContext.dispatch({ type: "DEL", payload: boardId });

      setToggleDELContext(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="border overflow-visible bg-img-gradient">
      <CardHeader>
        <Link to={`/boards/${boardId}`}>
          <CardTitle className="hover:underline">{boardTitle}</CardTitle>
          {/* Hier muss ich noch eine abgrage machen welche Tasks Das board alles hat */}
          <CardDescription className="text-xs">
            3 Spalten:{taskValue} Tasks
          </CardDescription>
        </Link>
        <CardAction className="relative w-full">
          <Button
            variant="outline"
            className="border-none text-muted bg-card hover:bg-card hover:text-red-700 "
            onClick={() => {
              setToggleDELContext(true);
            }}
          >
            <Trash2 />
          </Button>
          {toggleDELContext && (
            <div className="absolute border rounded-md top-full  right-5 w-40 h-fit flex flex-col items-center p-2 bg-card text-xs  gap-2">
              <p>Board Löschen?</p>
              <div className="flex gap-1">
                <Button
                  variant={"default"}
                  onClick={() => {
                    handleDeleteBoard();
                  }}
                  className="text-white bg-red-600 border-muted text-xs  hover:bg-red-600"
                >
                  Löschen
                </Button>
                <Button
                  variant={"default"}
                  className="text-main bg-transparent border-muted text-xs py-0 px-1 hover:bg-transparent"
                  onClick={() => {
                    setToggleDELContext(false);
                  }}
                >
                  Abbrechen
                </Button>
              </div>
            </div>
          )}
        </CardAction>
      </CardHeader>
    </Card>
  );
}
export default BoardCard;
