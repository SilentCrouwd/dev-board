import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { BoardCardProps } from "../../../types/boardType";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useBoardContext } from "@/Context/BoardContext";

function BoardCard({
  boardTitle,
  taskValue,
  boardId,
}: Readonly<BoardCardProps>) {
  const BoardContext = useBoardContext();
  return (
    <Card className="border hover:scale-102">
      <CardHeader>
        <Link to={`/boards/${boardId}`} >
          <CardTitle className="hover:underline">{boardTitle}</CardTitle>

          <CardDescription className="text-xs">
            3 Spalten:{taskValue} Tasks
          </CardDescription>
        </Link>
        <CardAction>
          {" "}
          <Button
            onClick={() => {
              BoardContext.dispatch({ type: "DEL", payload: boardId });
            }}
            variant="outline"
            className="border-none text-muted bg-card hover:bg-card hover:text-red-700 "
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
export default BoardCard;
