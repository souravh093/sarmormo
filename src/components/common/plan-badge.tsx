import { pricePlans } from "@/constant/pricePlans";
import { getPriceId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Badge } from "../ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

const PlanBadge = async () => {
  const user = await currentUser();

  if (!user?.id) return null;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  let priceId: string | null = null;
  if (email) {
    priceId = await getPriceId(email);
  }

  let planName = "Buy a plan";

  const plan = pricePlans.find((plan) => plan.priceId === priceId);

  if (plan) {
    planName = plan.name;
  }

  return (
    <Badge
      variant={"outline"}
      className={cn(
        "ml-2 py-1 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
        !priceId && "from-red-100 to-red-200 border-red-300 py-1"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-600",
          !priceId && "text-red-600"
        )}
      />{" "}
      {planName}
    </Badge>
  );
};

export default PlanBadge;
