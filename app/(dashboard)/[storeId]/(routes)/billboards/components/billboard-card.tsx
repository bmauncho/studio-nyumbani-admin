import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Edit2, Trash } from "lucide-react";
import Image from "next/image";

interface BillboardCardProps {
  data: any;
}

const BillboardCard = ({ data }: BillboardCardProps) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-40 aspect-video">
        <Image
          src="https://images.unsplash.com/photo-1782848796146-58d56169bc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      {/* bill board info */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">{"Billboard"}</h3>
          <p className="text-sm text-muted-foreground">{"Created at"}</p>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={cn("bg-green-100 text-green-800")}>
            {"Active"}
          </Badge>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => {}}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="destructive" onClick={() => {}}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillboardCard;
