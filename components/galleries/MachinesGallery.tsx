"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Skeleton } from "@/components/ui/skeleton";

import MachineCard from "../cards/MachineCard";

export default function MachinesGallery() {
  const response = useQuery(api.machines.getMachines);
  if (response === undefined)
    return (
      <div className="grid grid-cols-5 gap-4 p-4">
        <Skeleton className="h-64 w-full border" />
        <Skeleton className="h-64 w-full border" />
        <Skeleton className="h-64 w-full border" />
      </div>
    );
  if (!response.success) return <div>{response.message}</div>;
  const machines = response.data;

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {machines &&
        machines.map((machine) => (
          <MachineCard key={machine._id} machine={machine} />
        ))}
    </div>
  );
}
