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

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CreateTemplateDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const createTemplate = useMutation(api.templates.createWorkoutTemplate);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!name) return toast.error("Please enter a name");
    const response = await createTemplate({
      name,
      description,
    });
    if (!response.success) return toast.error(response.message);
    toast.success("Template created successfully");
    setName("");
    setDescription("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-0 right-0 p-4 z-50">
          <Button>Create Template</Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new template</DialogTitle>
          <DialogDescription>
            Create a new template for your workout!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              placeholder="Template Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              placeholder="Template Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handleSubmit}>Create Template</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
