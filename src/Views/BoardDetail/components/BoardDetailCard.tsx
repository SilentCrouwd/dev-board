import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

interface DetailCardProps {
  status: string;
  statusValue?: number;
  tasks?: string;
}

function BoardDetailCard({
  status,
  statusValue,
  tasks,
}: Readonly<DetailCardProps>) {
  return (
    <Card className="border gap-0 bg-transparent">
      <CardHeader className=" items-center justify-between flex">
        <CardTitle className="">
          {status}
          <span className="text-xs text-muted"> {statusValue ?? 0}</span>
        </CardTitle>
        <CardAction>
          <Button className="bg-transparent text-main">
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="bg-transparent flex justify-center items-center min-h-25 ">
        {tasks || "Keine Task vorhanden"}
      </CardFooter>
    </Card>
  );
}
export default BoardDetailCard;
