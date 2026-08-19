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

import { useEffect, useState } from "react";
import type { UpdateTask } from "./BoardTask";
import type { Task } from "@/types/boardType";

interface TaskDialogProps {
  currTask: Task;
  currUser: string;
  handleUpdate: (updatedObj: UpdateTask) => void;
}
function BoardTaskDialog({
  currTask,
  handleUpdate,
  currUser,
}: TaskDialogProps) {
  const handleDate = currTask.taskDeadline;
  let isoDate = "";
  if (handleDate) {
    const [day, month, year] = handleDate.split(".");
    isoDate = `${year}-${month}-${day}`;
  }

  const [dateValue, setDateValue] = useState(isoDate);
  const [titleValue, setTitleValue] = useState(currTask.taskTitle);
  const [descValue, setDescValue] = useState(currTask.taskDescription);
  const [userValue, setUserValue] = useState(currUser);

  useEffect(() => {
    setDateValue(isoDate);
    setTitleValue(currTask.taskTitle);
    setDescValue(currTask.taskDescription);
    setUserValue(currTask.taskUser);
  }, [currTask]);

  function handleAddUpdatedTask(e: React.FormEvent) {
    e.preventDefault();
    let germanDate = "";
    if (dateValue) {
      const [year, month, day] = dateValue.split("-");
      germanDate = `${day}.${month}.${year}`;
    }
    const updatedTask = {
      taskTitle: titleValue,
      taskDescription: descValue,
      taskDeadline: germanDate,
      taskUser: userValue,
    };
    handleUpdate(updatedTask);
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="link"
            className=" text-lg text-main hover:cursor-pointer"
          >
            {currTask.taskTitle}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            handleAddUpdatedTask(e);
          }}
        >
          <DialogHeader className="p-3">
            <DialogTitle>Neue Task erstellen</DialogTitle>
            <DialogDescription>
              erstelle eine neue Aufgabe für diese Spalte.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="p-3">
            <Field>
              <Label htmlFor="title">Titel</Label>
              <Input
                id="title"
                name="taskTitle"
                placeholder="Task-Titel"
                onChange={(e) => {
                  setTitleValue(e.currentTarget.value);
                }}
                value={titleValue}
              />
            </Field>
            <Field>
              <Label htmlFor="description">Beschreibung</Label>
              <textarea
                className=" w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                id="description"
                name="taskDescription"
                onChange={(e) => {
                  setDescValue(e.currentTarget.value);
                }}
                value={descValue}
                placeholder="Was soll erledigt Werden?"
                rows={5}
              />
            </Field>
            <Field>
              <Label htmlFor="user">Zugewiesen an</Label>
              <select
                id="user"
                name="taskUser"
                className=" w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                onChange={(e) => {
                  setUserValue(e.currentTarget.value);
                }}
                value={userValue}
              >
                <option value="Niemand">Niemand</option>
                <option value={`${currUser}`}>{currUser}</option>
              </select>
            </Field>
            <Field>
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                className=" w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                id="deadline"
                name="taskDeadline"
                type="date"
                onChange={(e) => {
                  setDateValue(e.currentTarget.value);
                }}
                value={dateValue}
              />
            </Field>
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
                  type="submit"
                  className=" p-5 rounded-sm bg-primary text-main hover:cursor-pointer hover:bg-primary-foreground "
                >
                  Erstellen
                </Button>
              }
            />
          </FieldGroup>
          <DialogFooter className="bg-background border-none"></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BoardTaskDialog;
