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

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CreateMachineDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const createMachine = useMutation(api.machines.createMachine);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  const [weightType, setWeightType] = useState<"kg" | "lb">("kg");

  const handleSubmit = async () => {
    if (!name) return toast.error("Please enter a name");
    if (!weightType) return toast.error("Please select a weight type");
    const response = await createMachine({ name, description, weightType });
    if (!response.success) return toast.error(response.message);
    toast.success("Machine created successfully");
    setName("");
    setDescription("");
    setWeightType("kg");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-0 right-0 p-4 z-50">
          <Button>Create Machine</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new machine</DialogTitle>
          <DialogDescription>
            Create a new machine for your workout!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              placeholder="Machine Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              placeholder="Machine Description"
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
              value={weightType}
              onValueChange={(value) => setWeightType(value as "kg" | "lb")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a weight type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Weight in kg</SelectItem>
                <SelectItem value="lb">Weight in lb</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleSubmit}>Create Machine</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
