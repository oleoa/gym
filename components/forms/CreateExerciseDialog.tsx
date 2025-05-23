"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function CreateExerciseDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const machinesResponse = useQuery(api.machines.getMachines);

  const createExercise = useMutation(api.exercises.createExerciseModel);

  const [machineId, setMachineId] = useState<Id<"machinesModels">>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [imageUrl, setImageUrl] = useState("");

  if (machinesResponse === undefined) return <></>;
  if (!machinesResponse.success || !machinesResponse.data)
    return <div>{machinesResponse.message}</div>;
  const machines = machinesResponse.data;

  const handleSubmit = async () => {
    if (!name) return toast.error("Please enter a name");
    if (!machineId) return toast.error("Please select a machine");
    const response = await createExercise({
      name,
      description,
      machineId,
    });
    if (!response.success) return toast.error(response.message);
    toast.success("Exercise created successfully");
    setName("");
    setDescription("");
    setMachineId(undefined);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-0 right-0 p-4 z-50">
          <Button>Create Exercise</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new exercise</DialogTitle>
          <DialogDescription>
            Create a new exercise for your workout!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              placeholder="Exercise Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              placeholder="Exercise Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* <Input
              type="text"
              placeholder="Machine Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            /> */}
            <Select
              value={machineId}
              onValueChange={(value) =>
                setMachineId(value as Id<"machinesModels">)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a machine" />
              </SelectTrigger>
              <SelectContent>
                {machines.map((machine) => (
                  <SelectItem key={machine._id} value={machine._id}>
                    {machine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleSubmit}>Create Exercise</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
