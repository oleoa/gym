import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  machinesModels: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.string(),
    // imageUrl: v.string(),
    weightType: v.union(v.literal("kg"), v.literal("lb")),
  }).index("byUserId", ["userId"]),
  exercisesModels: defineTable({
    userId: v.string(),
    machineId: v.id("machinesModels"),
    name: v.string(),
    description: v.string(),
    // imageUrl: v.string(),
  })
    .index("byMachineId", ["machineId"])
    .index("byUserId", ["userId"]),

  workoutTemplates: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.string(),
  }).index("byUserId", ["userId"]),
  exercisesWorkoutTemplate: defineTable({
    workoutTemplateId: v.id("workoutTemplates"),
    exerciseModelId: v.id("exercisesModels"),
  }).index("byWorkoutTemplateId", ["workoutTemplateId"]),

  workouts: defineTable({
    userId: v.string(),
    date: v.string(),
    division: v.string(),
  }).index("byUserId", ["userId"]),
  exercises: defineTable({
    workoutId: v.id("workouts"),
    exerciseModelId: v.id("exercisesModels"),
    sets: v.number(),
    reps: v.number(),
  })
    .index("byWorkoutId", ["workoutId"])
    .index("byExerciseModelId", ["exerciseModelId"]),
  sets: defineTable({
    exerciseId: v.id("exercises"),
    weight: v.number(),
    reps: v.number(),
    description: v.string(),
  }).index("byExerciseId", ["exerciseId"]),
});
