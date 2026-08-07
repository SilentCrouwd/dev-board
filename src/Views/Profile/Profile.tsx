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
import { useState } from "react";

function Profile() {
  const [userName, setUserName] = useState("");
  return (
    <div className="flex flex-col p-5 max-w-md  sm:mx-auto mt-2">
      <p className=" font-bold text-2xl">Profil</p>
      <Card className="w-full h-fit mt-5 border p-3">
        <CardHeader>
          <CardTitle className="text-lg">Benutzername Ändern</CardTitle>
          <CardDescription>
            Ändere deinen Anzeigenamen für das Board.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
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
          <Button
            className="text-sm mt-5 px-4 py-5 rounded-sm bg-primary text-main hover:cursor-pointer hover:bg-primary-foreground "
            type="submit"
            onClick={() => {
              setUserName("");
            }}
          >
            Speichern
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
