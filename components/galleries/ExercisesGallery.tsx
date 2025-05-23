"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Skeleton } from "@/components/ui/skeleton";

import ExerciseCard from "@/components/cards/ExerciseCard";

export default function ExercisesGallery() {
  const response = useQuery(api.exercises.getExercisesModelsFromUser);
  if (response === undefined)
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <Skeleton className="h-48 w-full border" />
        <Skeleton className="h-48 w-full border" />
        <Skeleton className="h-48 w-full border" />
      </div>
    );
  if (!response.success) return <div>{response.message}</div>;
  const exercises = response.data;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {exercises &&
        exercises.map((exercise) => (
          <ExerciseCard key={exercise._id} exercise={exercise} />
        ))}
    </div>
  );
}
