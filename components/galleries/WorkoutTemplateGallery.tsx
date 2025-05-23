"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Skeleton } from "@/components/ui/skeleton";

import WorkoutTemplateCard from "../cards/WorkoutTemplateCard";

export default function WorkoutTemplateGallery() {
  const response = useQuery(api.templates.getWorkoutTemplatesFromUser);
  if (response === undefined)
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <Skeleton className="h-48 w-full border" />
        <Skeleton className="h-48 w-full border" />
        <Skeleton className="h-48 w-full border" />
      </div>
    );
  if (!response.success) return <div>{response.message}</div>;
  const workoutTemplates = response.data;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {workoutTemplates &&
        workoutTemplates.map((workoutTemplate) => (
          <WorkoutTemplateCard
            key={workoutTemplate._id}
            workoutTemplate={workoutTemplate}
          />
        ))}
    </div>
  );
}
