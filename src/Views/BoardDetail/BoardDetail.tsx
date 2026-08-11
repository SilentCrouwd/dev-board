import { ArrowLeft, Check, Pencil, X } from "lucide-react";
import BoardDetailCard from "./components/BoardDetailCard";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useBoardContext } from "@/Context/BoardContext";
import { setToAPI } from "@/Hooks/StorageAPI";

function BoardDetail() {
  const { state, dispatch } = useBoardContext();
  const { id } = useParams();
  const currentBoard = state?.Boards?.filter((b) => b.boardId === Number(id));
  const [editMode, setEditMode] = useState(false);

  if (!currentBoard) {
    return <div>No Board found</div>;
  }
  useEffect(() => {
    setToAPI(state);
  }, [state]);
  const [value, setValue] = useState(currentBoard[0].boardTitle);

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

          <p className="font-bold text-xl">{currentBoard[0].boardTitle}</p>

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
          <BoardDetailCard cardTitle={"todo"} task={currentBoard[0].task} />
          <BoardDetailCard
            cardTitle={"inProgress"}
            task={currentBoard[0].task}
          />
          <BoardDetailCard cardTitle={"Done"} task={currentBoard[0].task} />
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
                setValue(currentBoard[0].boardTitle);
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
                  payload: { id: Number(id), value: value },
                });

                setEditMode(!editMode);
              }}
            >
              <Check />
            </Button>
          </Field>
        </FieldGroup>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-10"></div>
      </div>
    );
  }

  return editMode ? renderEdit() : renderBoardDetailContent();
}
export default BoardDetail;
