import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useBoardContext } from "@/Hooks/useBoardContext";
import { useEffect, useState } from "react";

function Profile() {
  const [userName, setUserName] = useState("");
  const BoardContext = useBoardContext();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isSaved) return;

    const timer = setTimeout(() => {
      setIsSaved(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSaved]);
  return (
    <div className="flex flex-col  max-w-md  sm:mx-auto mt-2">
      <p className=" font-bold text-2xl">Profil</p>
      <Card className="w-full h-fit mt-5 border   bg-img-gradient">
        <CardContent className="px-2">
          <CardHeader className=" my-5   ">
            <CardTitle className="text-lg text-card-foreground py-3 ">
              Benutzername Ändern
            </CardTitle>
            <CardDescription>
              Ändere deinen Anzeigenamen für das Board.
            </CardDescription>
          </CardHeader>

          <Field className="mt-5 text-popover-foreground px-3">
            <FieldLabel htmlFor="input-field-username">Name</FieldLabel>
            <Input
              id="input-field-username"
              type="text"
              placeholder="Nutzer"
              value={userName}
              onChange={(e) => {
                setUserName(e.currentTarget.value);
              }}
            />
          </Field>
        </CardContent>
        <CardFooter className="bg-background">
          <div className=" flex items-center  w-full justify-end  gap-3">
            {isSaved && <p className="text-green-600">Saved !!!</p>}{" "}
            <Button
              className="text-sm  rounded-sm bg-primary text-main hover:cursor-pointer hover:bg-primary-foreground "
              onClick={() => {
                BoardContext.dispatch({ type: "ADD_USER", payload: userName });
                setUserName("");
                setIsSaved(true);
              }}
            >
              Speichern
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Profile;
