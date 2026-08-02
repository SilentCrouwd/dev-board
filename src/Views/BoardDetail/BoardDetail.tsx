import { ArrowLeft, Check, Pencil, X } from "lucide-react";
import BoardDetailCard from "./components/BoardDetailCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import BoardTask from "./components/BoardTask";
import type { BoardType } from "@/types/boardType";

function BoardDetail() {
  const [board, setBoard] = useState<BoardType>({
    boardTitle: "hallo",
    Task: [{ taskTitle: "hallo2", taskDescription: "hir is ne beschreibung" }],
  });
  const [editMode, setEditMode] = useState(false);

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

          <p className="font-bold text-xl">{board.boardTitle}</p>

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
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-10">
          <BoardDetailCard
            cardTitle="todo"
            tasksCard={
              <BoardTask taskTitle={"test"} taskDescription={"Description"} />
            }
          />
          <BoardDetailCard cardTitle="inProgress" />
          <BoardDetailCard cardTitle="Done" />
        </div>
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
              value={board.boardTitle}
              onChange={(e) => {
                const newTitle = e.currentTarget.value;
                setBoard((prev) => ({
                  ...prev,
                  boardTitle: newTitle,
                }));
              }}
              id="fieldgroup-name"
              className="border border-primary max-w-full "
            />
          </Field>

          <Field orientation="horizontal" className="w-1/2 sm:w-full">
            <Button
              type="reset"
              variant="outline"
              onClick={() => {
                setEditMode(!editMode);
              }}
              className="border-none order-1 hover:bg-primary-foreground hover:cursor-pointer"
            >
              <X />
            </Button>
            <Button
              type="submit"
              className="bg-transparent text-main hover:cursor-pointer"
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              <Check />
            </Button>
          </Field>
        </FieldGroup>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-10">
          <BoardDetailCard cardTitle="todo" />
          <BoardDetailCard cardTitle="inProgress" />
          <BoardDetailCard cardTitle="Done" />
        </div>
      </div>
    );
  }

  return editMode ? renderEdit() : renderBoardDetailContent();
}
export default BoardDetail;
