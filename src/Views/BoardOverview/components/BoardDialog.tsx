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
import { Plus } from "lucide-react";

function BoardDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button
              className="text-sm  px-4 py-5 rounded-sm bg-primary text-main hover:cursor-pointer hover:bg-primary-foreground "
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
              className=" p-5 rounded-sm bg-primary text-main hover:cursor-pointer hover:bg-primary-foreground "
              type="submit"
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
