"use client";

import { useState } from "react";

import { Doc } from "@/convex/_generated/dataModel";
type WorkoutTemplate = Doc<"workoutTemplates">;
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function WorkoutTemplateCard({
  workoutTemplate,
}: {
  workoutTemplate: WorkoutTemplate;
}) {
  const deleteWorkoutTemplate = useMutation(
    api.templates.deleteWorkoutTemplate
  );
  const updateWorkoutTemplate = useMutation(
    api.templates.updateWorkoutTemplate
  );

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(workoutTemplate.name);
  const [description, setDescription] = useState(workoutTemplate.description);

  const handleDeleteWorkoutTemplate = async () => {
    const response = await deleteWorkoutTemplate({
      workoutTemplateId: workoutTemplate._id,
    });
    if (!response.success) toast.error(response.message);
    else toast.success("Workout template deleted successfully");
  };

  const handleUpdateWorkoutTemplate = async () => {
    const response = await updateWorkoutTemplate({
      workoutTemplateId: workoutTemplate._id,
      name: name,
      description: description,
    });
    if (!response.success) toast.error(response.message);
    else toast.success("Workout template updated successfully");
    setIsEditing(false);
  };

  return (
    <Card className="w-full h-fit min-h-48 flex justify-between">
      <CardHeader>
        <CardTitle>
          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            <h2 className="text-xl font-bold">{workoutTemplate.name}</h2>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-2">
        {isEditing ? (
          <Textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        ) : (
          <p className="text-sm">{workoutTemplate.description}</p>
        )}
        {workoutTemplate.description && <Separator />}
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {isEditing ? (
          <Button variant="default" onClick={handleUpdateWorkoutTemplate}>
            Save
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
        <Button variant="destructive" onClick={handleDeleteWorkoutTemplate}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
