import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { useState } from "react";
interface LoginType {
  handleLogin: (email: string, password: string) => void;
  className?: string;
  handleGuest: () => void;
}

function LoginForm({ handleLogin, handleGuest }: LoginType) {
  const [email, setEmail] = useState<string>();

  const [password, setPassword] = useState<string>();

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password) {
      handleLogin(email, password);
    }
  }
  return (
    <Card className=" max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent>
        <form id="loginForm" onSubmit={handleOnSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="loginForm"
          className="w-full text-accent-foreground"
        >
          Login
        </Button>
        <Button onClick={handleGuest} variant="outline" className="w-full">
          Login als Gast
        </Button>
      </CardFooter>
    </Card>
  );
}
export default LoginForm;
