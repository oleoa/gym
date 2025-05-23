"use client";

import { useState } from "react";

import { Doc } from "@/convex/_generated/dataModel";
type Machine = Doc<"machinesModels">;
import { useMutation } from "convex/react";
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

export default function MachineCard({ machine }: { machine: Machine }) {
  const deleteMachine = useMutation(api.machines.deleteMachine);
  const handleDeleteMachine = async () => {
    const response = await deleteMachine({
      machineId: machine._id,
    });
    if (!response.success) toast.error(response.message);
    else toast.success("Machine deleted successfully");
  };

  const updateMachine = useMutation(api.machines.updateMachine);
  const handleUpdateMachine = async () => {
    const response = await updateMachine({
      machineId: machine._id,
      name: machineName,
      description: machineDescription,
      weightType: machineWeightType,
    });
    if (!response.success) toast.error(response.message);
    else toast.success("Machine updated successfully");
    setIsEditing(false);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [machineName, setMachineName] = useState(machine.name);
  const [machineDescription, setMachineDescription] = useState(
    machine.description
  );
  const [machineWeightType, setMachineWeightType] = useState(
    machine.weightType
  );

  return (
    <Card className="w-full h-fit min-h-48 flex justify-between">
      <CardHeader>
        <CardTitle>
          {isEditing ? (
            <Input
              value={machineName}
              onChange={(e) => {
                setMachineName(e.target.value);
              }}
            />
          ) : (
            <h2 className="text-xl font-bold">{machine.name}</h2>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pb-2">
        {isEditing ? (
          <Textarea
            value={machineDescription}
            onChange={(e) => {
              setMachineDescription(e.target.value);
            }}
          />
        ) : (
          <p className="text-sm">{machine.description}</p>
        )}
        <Separator />
        {isEditing ? (
          <Select
            value={machineWeightType}
            onValueChange={(value) =>
              setMachineWeightType(value as "kg" | "lb")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a weight type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg">Weight in kg</SelectItem>
              <SelectItem value="lb">Weight in lb</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm">Mesured in {machine.weightType}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        {isEditing ? (
          <Button variant="default" onClick={handleUpdateMachine}>
            Save
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
        <Button variant="destructive" onClick={handleDeleteMachine}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
