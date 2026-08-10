import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useBoardContext } from "@/Context/BoardContext";
import { getFromAPI } from "@/Hooks/StorageAPI";
import type { BoardType } from "@/types/boardType";
import { Plus } from "lucide-react";
import { useState } from "react";

function BoardDialog() {
  const BoardContext = useBoardContext();
  const [value, setValue] = useState("");

  function handleCheckExist() {
    const currList = getFromAPI();
    const exist = currList.Boards.find(
      (board: BoardType) => board.boardTitle === value,
    );
    if (!exist) {
      BoardContext.dispatch({ type: "ADD", payload: value });
    } else {
      // Bitte noch schöner machen so mit nem toast oder so

      alert(`${value}  ist schon vorhanden `);
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button
              className="text-sm border-none  px-4 py-5 rounded-sm bg-primary text-main hover:cursor-pointer hover:bg-primary-foreground "
              variant="outline"
            >
              <Plus /> Neues Board
            </Button>
          }
        />
        <DialogContent className=" max-w-135  sm:max-w-135 ">
          <DialogHeader className="text-center sm:text-start p-5 font-bold">
            <DialogTitle>Neues Board erstellen</DialogTitle>
            <DialogDescription className="text-center sm:text-start font-normal">
              Gib dem Board einen Namen. Es werden automatisch drei Spalten
              angelegt (To Do, In Progress, Done)
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Input
                className="border "
                id="name-1"
                name="name"
                placeholder="Board-Name"
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                }}
                value={value}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="bg-background border-none">
            <DialogClose
              render={
                <Button
                  // disabled={}
                  className="p-5 rounded-sm border border-primary hover:cursor-pointer hover:bg-primary-foreground"
                  variant="outline"
                >
                  Abbrechen
                </Button>
              }
            />
            <Button
              onClick={() => {
                handleCheckExist();
              }}
              className=" p-5 rounded-sm bg-primary text-main hover:cursor-pointer hover:bg-primary-foreground "
            >
              Erstellen
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default BoardDialog;
