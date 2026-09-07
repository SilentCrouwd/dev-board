import { signInWithEmail } from "@/Hooks/StorageAPI";

import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { CircleUserRound, LayoutDashboard } from "lucide-react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

function Root() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin(email: string, password: string) {
    if (email && password) {
      await signInWithEmail(email, password);

      navigate("/boards");
      window.location.reload();
    }
  }
  async function handleLogout() {
    await supabase.auth.signOut();
  }
  async function handleLoginAsGuest() {
    await supabase.auth.signInAnonymously();
    navigate("/boards");
    window.location.reload();
  }
  return (
    <div>
      <nav className="bg-foreground border-b border-b-primary">
        <div className="lg:max-w-250 flex justify-between px-5 mx-auto h-fit">
          <Link to={"/boards"}>
            <p className=" text-primary font-bold text-lg py-5 flex gap-2 ">
              <LayoutDashboard className="text-primary w-4" />
              DevBoard
            </p>
          </Link>
          <div className="flex items-center gap-5">
            {session && (
              <Button
                variant="outline"
                className="text-primary hover:text-primary-foreground"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}

            <p className="text-muted flex  gap-2">
              <CircleUserRound
                className={`w-5  ${session ? "text-green-600" : "text-red-900"}`}
              />
            </p>
          </div>
        </div>
      </nav>

      {session ? (
        <Outlet></Outlet>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          className="max-w-sm mx-auto"
          handleGuest={handleLoginAsGuest}
        />
      )}
    </div>
  );
}

export default Root;
