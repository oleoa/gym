import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createWorkoutTemplate = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    // imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to create a workout template",
      };

    const userId = identity.subject;
    await ctx.db.insert("workoutTemplates", {
      userId,
      name: args.name,
      description: args.description,
      // imageUrl: args.imageUrl,
    });
    return {
      success: true,
      message: "Workout template created successfully",
    };
  },
});

export const getWorkoutTemplatesFromUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to get workout templates",
      };
    const userId = identity.subject;
    const workoutTemplates = await ctx.db
      .query("workoutTemplates")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .collect();
    return {
      success: true,
      message: "Workout templates fetched successfully",
      data: workoutTemplates,
    };
  },
});

export const getExercisesFromWorkoutTemplate = query({
  args: {
    workoutTemplateId: v.id("workoutTemplates"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message:
          "You must be logged in to get exercises from a workout template",
      };

    const exercises = await ctx.db
      .query("exercisesWorkoutTemplate")
      .withIndex("byWorkoutTemplateId", (q) =>
        q.eq("workoutTemplateId", args.workoutTemplateId)
      )
      .collect();

    return {
      success: true,
      message: "Exercises fetched successfully",
      data: exercises,
    };
  },
});

export const addExerciseToWorkoutTemplate = mutation({
  args: {
    workoutTemplateId: v.id("workoutTemplates"),
    exerciseModelId: v.id("exercisesModels"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message:
          "You must be logged in to add an exercise to a workout template",
      };

    const userId = identity.subject;
    const workoutTemplate = await ctx.db.get(args.workoutTemplateId);
    if (workoutTemplate === null)
      return {
        success: false,
        message: "Workout template not found",
      };

    if (workoutTemplate.userId !== userId)
      return {
        success: false,
        message:
          "You are not authorized to add an exercise to this workout template",
      };

    await ctx.db.insert("exercisesWorkoutTemplate", {
      workoutTemplateId: args.workoutTemplateId,
      exerciseModelId: args.exerciseModelId,
    });
    return {
      success: true,
      message: "Exercise added to workout template successfully",
    };
  },
});

export const deleteExerciseFromWorkoutTemplate = mutation({
  args: {
    exerciseWorkoutTemplateId: v.id("exercisesWorkoutTemplate"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message:
          "You must be logged in to delete an exercise from a workout template",
      };

    const exercise = await ctx.db.get(args.exerciseWorkoutTemplateId);
    if (exercise === null)
      return {
        success: false,
        message: "Exercise not found",
      };

    await ctx.db.delete(args.exerciseWorkoutTemplateId);
    return {
      success: true,
      message: "Exercise deleted from workout template successfully",
    };
  },
});

export const updateWorkoutTemplate = mutation({
  args: {
    workoutTemplateId: v.id("workoutTemplates"),
    name: v.string(),
    description: v.string(),
    // imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to update a workout template",
      };

    const userId = identity.subject;
    const workoutTemplate = await ctx.db.get(args.workoutTemplateId);
    if (workoutTemplate === null)
      return {
        success: false,
        message: "Exercise not found",
      };
    if (workoutTemplate.userId !== userId)
      return {
        success: false,
        message: "You are not authorized to update this workout template",
      };

    await ctx.db.patch(args.workoutTemplateId, {
      name: args.name,
      description: args.description,
      // imageUrl: args.imageUrl,
    });
    return {
      success: true,
      message: "Workout template updated successfully",
    };
  },
});

export const deleteWorkoutTemplate = mutation({
  args: {
    workoutTemplateId: v.id("workoutTemplates"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to delete a workout template",
      };

    const userId = identity.subject;
    const workoutTemplate = await ctx.db.get(args.workoutTemplateId);
    if (workoutTemplate === null)
      return {
        success: false,
        message: "Workout template not found",
      };

    if (workoutTemplate.userId !== userId)
      return {
        success: false,
        message: "You are not authorized to delete this workout template",
      };

    await ctx.db.delete(args.workoutTemplateId);
    return {
      success: true,
      message: "Workout template deleted successfully",
    };
  },
});
