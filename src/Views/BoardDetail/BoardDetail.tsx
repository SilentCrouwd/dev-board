import { ArrowLeft, Check, Pencil, X } from "lucide-react";
import BoardDetailCard from "./components/BoardDetailCard";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useBoardContext } from "@/Context/BoardContext";

function BoardDetail() {
  const { state, dispatch } = useBoardContext();
  const { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  // Set current Board

  const currentBoard = state?.Boards?.find((b) => b.boardId === id);
  const [value, setValue] = useState(currentBoard?.boardTitle || "");
  //edit handler toggle edit mode

  useEffect(() => {
    if (currentBoard) {
      setValue(currentBoard.boardTitle);
    }
  }, [currentBoard]);

  if (!currentBoard) {
    return <div>No Board found</div>;
  }
  function renderBoardDetailContent() {
    return (
      <div className="w-full flex flex-col justify-between  px-2 mt-5 lg:max-w-[1000px] mx-auto">
        <div className="flex w-full justify-start gap-10 h-7 items-center">
          <Link to="/boards">
            <Button
              variant="ghost"
              size="icon-lg"
              className="hover:bg-primary-foreground hover:cursor-pointer"
            >
              <ArrowLeft />
            </Button>
          </Link>

          <p className="font-bold text-xl">{currentBoard?.boardTitle}</p>

          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => {
              setEditMode(!editMode);
            }}
            className="hover:bg-primary-foreground hover:cursor-pointer"
          >
            <Pencil />
          </Button>
        </div>
        {currentBoard && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-10">
            <BoardDetailCard columnTitle={"ToDo"} board={currentBoard} />
            <BoardDetailCard columnTitle={"inProgress"} board={currentBoard} />
            <BoardDetailCard columnTitle={"Done"} board={currentBoard} />
          </div>
        )}
      </div>
    );
  }
  function renderEdit() {
    return (
      <div className="w-full flex flex-col justify-between  px-2 mt-5 lg:max-w-[1000px] mx-auto">
        <FieldGroup className="flex-row gap-0">
          <Link to="/boards">
            <Button
              variant="ghost"
              size="icon-lg"
              className="hover:bg-primary-foreground hover:cursor-pointer"
            >
              <ArrowLeft />
            </Button>
          </Link>
          <Field className="w-1/2">
            <Input
              value={value}
              onChange={(e) => {
                setValue(e.currentTarget.value);
              }}
              id="fieldGroup-name"
              className="border border-primary max-w-full "
            />
          </Field>

          <Field orientation="horizontal" className="w-1/2 sm:w-full">
            <Button
              type="reset"
              variant="outline"
              onClick={() => {
                setEditMode(!editMode);
                if (currentBoard) {
                  setValue(currentBoard.boardTitle);
                }
              }}
              className="border-none order-1 hover:bg-primary-foreground hover:cursor-pointer"
            >
              <X />
            </Button>
            <Button
              type="submit"
              className="bg-transparent text-main hover:cursor-pointer"
              onClick={() => {
                dispatch({
                  type: "UPDATE",
                  payload: { id: String(id), value: value },
                });

                setEditMode(!editMode);
              }}
            >
              <Check />
            </Button>
          </Field>
        </FieldGroup>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-10"></div>
        {currentBoard && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-10">
            <BoardDetailCard columnTitle={"ToDo"} board={currentBoard} />
            <BoardDetailCard columnTitle={"inProgress"} board={currentBoard} />
            <BoardDetailCard columnTitle={"Done"} board={currentBoard} />
          </div>
        )}
      </div>
    );
  }

  return editMode ? renderEdit() : renderBoardDetailContent();
}
export default BoardDetail;
