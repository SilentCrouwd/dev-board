import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DetailCardProps } from "@/types/boardType";
import { Plus } from "lucide-react";

function BoardDetailCard({
  cardTitle,
  statusValue,
  tasksCard,
}: Readonly<DetailCardProps>) {
  return (
    <Card className="border gap-0 bg-transparent">
      <CardHeader className=" items-center justify-between flex">
        <CardTitle className="">
          {cardTitle}
          <span className="text-xs text-muted"> {statusValue ?? 0}</span>
        </CardTitle>
        <CardAction>
          <Button className="bg-transparent text-main hover:cursor-pointer">
            <Plus />
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="bg-transparent flex justify-center items-center min-h-25 ">
        {tasksCard?.length !== 0 ? tasksCard : "keine Task vorhanden"}
      </CardFooter>
    </Card>
  );
}
export default BoardDetailCard;
