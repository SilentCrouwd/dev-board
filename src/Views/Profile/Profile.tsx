import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useBoardContext } from "@/Context/BoardContext";
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
    <div className="flex flex-col p-5 max-w-md  sm:mx-auto mt-2">
      <p className=" font-bold text-2xl">Profil</p>
      <Card className="w-full h-fit mt-5 border px-3  bg-background ">
        <CardHeader className="bg-img-gradient my-5  ">
          <CardTitle className="text-lg text-card-foreground py-3">
            Benutzername Ändern
          </CardTitle>
          <CardDescription>
            Ändere deinen Anzeigenamen für das Board.
          </CardDescription>
        </CardHeader>
        <CardContent className="border-t ">
          <Field className="mt-5 text-popover-foreground">
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
          <div className=" flex items-center mt-5 px-4 py-5 gap-3">
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
            {isSaved && <p className="text-green-600">Saved !!!</p>}{" "}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
