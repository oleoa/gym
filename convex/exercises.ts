import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createExerciseModel = mutation({
  args: {
    machineId: v.id("machinesModels"),
    name: v.string(),
    description: v.string(),
    // imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to create an exercise",
      };
    const userId = identity.subject;
    await ctx.db.insert("exercisesModels", {
      userId,
      machineId: args.machineId,
      name: args.name,
      description: args.description,
      // imageUrl: args.imageUrl,
    });
    return {
      success: true,
      message: "Exercise created successfully",
    };
  },
});

export const getExercisesModelsFromMachine = query({
  args: {
    machineId: v.id("machinesModels"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to get exercises",
      };
    const userId = identity.subject;
    const exercises = await ctx.db
      .query("exercisesModels")
      .withIndex("byMachineId", (q) => q.eq("machineId", args.machineId))
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
    return {
      success: true,
      message: "Exercises fetched successfully",
      data: exercises,
    };
  },
});

export const deleteExerciseModel = mutation({
  args: {
    exerciseModelId: v.id("exercisesModels"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to delete an exercise",
      };

    const userId = identity.subject;
    const exercise = await ctx.db.get(args.exerciseModelId);
    if (exercise === null)
      return {
        success: false,
        message: "Exercise not found",
      };

    if (exercise.userId !== userId)
      return {
        success: false,
        message: "You are not authorized to delete this exercise",
      };

    await ctx.db.delete(args.exerciseModelId);
    return {
      success: true,
      message: "Exercise deleted successfully",
    };
  },
});

export const updateExerciseModel = mutation({
  args: {
    exerciseModelId: v.id("exercisesModels"),
    machineId: v.id("machinesModels"),
    name: v.string(),
    description: v.string(),
    // imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to update an exercise",
      };

    const userId = identity.subject;
    const exercise = await ctx.db.get(args.exerciseModelId);
    if (exercise === null)
      return {
        success: false,
        message: "Exercise not found",
      };
    if (exercise.userId !== userId)
      return {
        success: false,
        message: "You are not authorized to update this exercise",
      };

    await ctx.db.patch(args.exerciseModelId, {
      machineId: args.machineId,
      name: args.name,
      description: args.description,
      // imageUrl: args.imageUrl,
    });
    return {
      success: true,
      message: "Exercise updated successfully",
    };
  },
});
