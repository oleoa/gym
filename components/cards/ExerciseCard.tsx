"use client";

import { useState } from "react";

import { Doc, Id } from "@/convex/_generated/dataModel";
type Exercise = Doc<"exercisesModels">;
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const machineResponse = useQuery(api.machines.getMachine, {
    machineId: exercise.machineId,
  });
  const machinesResponse = useQuery(api.machines.getMachines);
  const deleteExercise = useMutation(api.exercises.deleteExerciseModel);
  const updateExercise = useMutation(api.exercises.updateExerciseModel);

  const [isEditing, setIsEditing] = useState(false);
  const [machineId, setMachineId] = useState(exercise.machineId);
  const [exerciseName, setExerciseName] = useState(exercise.name);
  const [exerciseDescription, setExerciseDescription] = useState(
    exercise.description
  );

  if (machineResponse === undefined)
    return <Skeleton className="h-48 w-full border" />;
  if (!machineResponse.success || !machineResponse.data)
    return <div>{machineResponse.message}</div>;
  const machine = machineResponse.data;

  if (machinesResponse === undefined)
    return <Skeleton className="h-48 w-full border" />;
  if (!machinesResponse.success || !machinesResponse.data)
    return <div>{machinesResponse.message}</div>;
  const machines = machinesResponse.data;

  const handleDeleteExercise = async () => {
    const response = await deleteExercise({
      exerciseModelId: exercise._id,
    });
    if (!response.success) toast.error(response.message);
    else toast.success("Exercise deleted successfully");
  };

  const handleUpdateExercise = async () => {
    const response = await updateExercise({
      exerciseModelId: exercise._id,
      name: exerciseName,
      description: exerciseDescription,
      machineId: exercise.machineId,
    });
    if (!response.success) toast.error(response.message);
    else toast.success("Exercise updated successfully");
    setIsEditing(false);
  };

  return (
    <Card className="w-full h-fit min-h-48 flex justify-between">
      <CardHeader>
        <CardTitle>
          {isEditing ? (
            <Input
              value={exerciseName}
              onChange={(e) => {
                setExerciseName(e.target.value);
              }}
            />
          ) : (
            <h2 className="text-xl font-bold">{exercise.name}</h2>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-2">
        {isEditing ? (
          <Textarea
            value={exerciseDescription}
            onChange={(e) => {
              setExerciseDescription(e.target.value);
            }}
          />
        ) : (
          <p className="text-sm">{exercise.description}</p>
        )}
        {exercise.description && <Separator />}
        {isEditing ? (
          <Select
            value={machineId}
            onValueChange={(value) =>
              setMachineId(value as Id<"machinesModels">)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a weight type" />
            </SelectTrigger>
            <SelectContent>
              {machines.map((machine) => (
                <SelectItem key={machine._id} value={machine._id}>
                  {machine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm">Machine: {machine.name}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {isEditing ? (
          <Button variant="default" onClick={handleUpdateExercise}>
            Save
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
        <Button variant="destructive" onClick={handleDeleteExercise}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
