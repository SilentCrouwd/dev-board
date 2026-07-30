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
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
function BoardOverview() {
  return (
    <div className="flex flex-col ">
      <div className="w-full flex justify-between items-center px-2 mt-5 xl:max-w-[1280px] mx-auto">
        <h2 className=" text-2xl font-bold">Meine Boards</h2>
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
      </div>
      <div className="w-full flex justify-center mt-20">
        <p className="text-lg italic text-muted text-center">
          Noch keine Boards vorhanden<br></br>
          <span className="text-xs">
            Erstelle dein erstes Board,um loszulegen
          </span>
        </p>
      </div>
    </div>
  );
}

export default BoardOverview;
