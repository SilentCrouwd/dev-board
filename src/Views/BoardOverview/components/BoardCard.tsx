import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";

function BoardCard() {
  return (
    <Link to={"/boards/12"}>
      <Card className="border hover:scale-102">
        <CardHeader>
          <CardTitle className="hover:underline">Title</CardTitle>
          <CardDescription className="text-xs">
            3 Spalten:0 Tasks{" "}
          </CardDescription>
          <CardAction>
            {" "}
            <Button
              variant="outline"
              className="border-none text-muted bg-card hover:bg-card hover:text-red-700"
            >
              <Trash2 />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  );
}
export default BoardCard;
