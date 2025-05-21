import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  machinesModels: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    weightType: v.union(v.literal("kg"), v.literal("lb")),
  }),
  exercisesModels: defineTable({
    machineId: v.id("machinesModels"),
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
  }),

  workoutTemplates: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.string(),
  }),
  exercisesWorkoutTemplate: defineTable({
    workoutTemplateId: v.id("workoutTemplates"),
    exerciseModelId: v.id("exercisesModels"),
  }),

  workouts: defineTable({
    userId: v.string(),
    date: v.string(),
    division: v.string(),
  }),
  exercises: defineTable({
    workoutId: v.id("workouts"),
    exerciseModelId: v.id("exercisesModels"),
    sets: v.number(),
    reps: v.number(),
  }),
  sets: defineTable({
    exerciseId: v.id("exercises"),
    weight: v.number(),
    reps: v.number(),
    description: v.string(),
  }),
});
