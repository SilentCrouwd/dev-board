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
import { useParams } from "react-router-dom";

function BoardDetailDialog({ handleAddTask }: any) {
  const { id } = useParams();
  const testTask = {
    taskTitle: "fi",
    taskDescription: "ssfsng",
    taskId: String(Date.now()),
    taskStatus: "Done",
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button className="bg-transparent text-main hover:cursor-pointer">
              <Plus />
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader className="p-3">
            <DialogTitle>Neue Task erstellen</DialogTitle>
            <DialogDescription>
              erstelle eine neue Aufgabe für diese Spalte.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="p-3">
            <Field>
              <Label htmlFor="title">Titel</Label>
              <Input id="title" name="task-title" placeholder="Task-Titel" />
            </Field>
            <Field>
              <Label htmlFor="description">Beschreibung</Label>
              <textarea
                className=" w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                id="description"
                name="task-description"
                placeholder="Was soll erledigt Werden?"
                rows={3}
              />
            </Field>
            <Field>
              <Label htmlFor="user">Zugewiesen an</Label>
              <select
                id="user"
                name="task-user"
                className=" w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
              >
                <option value="Niemand">Niemand</option>
                <option value="Niemand">Nutzer</option>
              </select>
            </Field>
            <Field>
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                className=" w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                id="deadline"
                name="task-deadline"
                type="date"
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="bg-background border-none">
            <DialogClose
              render={
                <Button
                  className="p-5 rounded-sm border border-primary hover:cursor-pointer hover:bg-primary-foreground"
                  variant="outline"
                >
                  Abbrechen
                </Button>
              }
            />
            <DialogClose
              render={
                <Button
                  onClick={() => {
                    console.log(id, testTask);

                    handleAddTask(testTask, id);
                  }}
                  className=" p-5 rounded-sm bg-primary text-main hover:cursor-pointer hover:bg-primary-foreground "
                >
                  Erstellen
                </Button>
              }
            />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
export default BoardDetailDialog;
