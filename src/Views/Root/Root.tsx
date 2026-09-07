import { signInWithEmail } from "@/Hooks/StorageAPI";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { CircleUserRound, LayoutDashboard } from "lucide-react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Button } from "@/components/ui/button";
import LoginForm from "./components/LoginForm";
import { BoardProvider } from "@/Context/BoardContext";

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
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function handleLoginAsGuest() {
    await supabase.auth.signInAnonymously();
    navigate("/boards");
  }

  const isGuest = session?.user?.is_anonymous ?? false;

  return (
    <div>
      <nav className="bg-foreground border-b border-b-primary">
        <div className="lg:max-w-250 flex justify-between px-5 mx-auto h-fit items-center">
          <Link to={"/boards"}>
            <p className="text-primary font-bold text-lg py-5 flex gap-2">
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

            <Link to={"/profile"} className="flex items-center">
              <p className="text-muted flex gap-2">
                <CircleUserRound
                  className={`w-5 ${
                    session
                      ? isGuest
                        ? "text-amber-500"
                        : "text-green-600"
                      : "text-red-900"
                  }`}
                />
              </p>
            </Link>
          </div>
        </div>
      </nav>

      {session ? (
        <BoardProvider session={session}>
          <Outlet />
        </BoardProvider>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          handleGuest={handleLoginAsGuest}
          className="max-w-sm mx-auto"
        />
      )}
    </div>
  );
}

export default Root;
