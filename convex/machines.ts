import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createMachine = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    // imageUrl: v.string(),
    weightType: v.union(v.literal("kg"), v.literal("lb")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to create a machine",
      };
    const userId = identity.subject;
    await ctx.db.insert("machinesModels", {
      userId,
      name: args.name,
      description: args.description,
      // imageUrl: args.imageUrl,
      weightType: args.weightType,
    });
    return {
      success: true,
      message: "Machine created successfully",
    };
  },
});

export const getMachines = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to get machines",
      };
    const userId = identity.subject;
    const machines = await ctx.db
      .query("machinesModels")
      .withIndex("byUserId", (q) => q.eq("userId", userId))
      .collect();
    return {
      success: true,
      message: "Machines fetched successfully",
      data: machines,
    };
  },
});

export const getMachine = query({
  args: {
    machineId: v.id("machinesModels"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to get a machine",
      };
    const userId = identity.subject;
    const machine = await ctx.db.get(args.machineId);
    if (machine === null)
      return {
        success: false,
        message: "Machine not found",
      };
    if (machine.userId !== userId)
      return {
        success: false,
        message: "You are not authorized to get this machine",
      };
    return {
      success: true,
      message: "Machine fetched successfully",
      data: machine,
    };
  },
});

export const deleteMachine = mutation({
  args: {
    machineId: v.id("machinesModels"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to delete a machine",
      };
    const userId = identity.subject;
    const machine = await ctx.db.get(args.machineId);
    if (machine === null)
      return {
        success: false,
        message: "Machine not found",
      };
    if (machine.userId !== userId)
      return {
        success: false,
        message: "You are not authorized to delete this machine",
      };
    await ctx.db.delete(args.machineId);
    return {
      success: true,
      message: "Machine deleted successfully",
    };
  },
});

export const updateMachine = mutation({
  args: {
    machineId: v.id("machinesModels"),
    name: v.string(),
    description: v.string(),
    // imageUrl: v.string(),
    weightType: v.union(v.literal("kg"), v.literal("lb")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null)
      return {
        success: false,
        message: "You must be logged in to update a machine",
      };
    const userId = identity.subject;
    const machine = await ctx.db.get(args.machineId);
    if (machine === null)
      return {
        success: false,
        message: "Machine not found",
      };
    if (machine.userId !== userId)
      return {
        success: false,
        message: "You are not authorized to update this machine",
      };
    await ctx.db.patch(args.machineId, {
      name: args.name,
      description: args.description,
      // imageUrl: args.imageUrl,
      weightType: args.weightType,
    });
    return {
      success: true,
      message: "Machine updated successfully",
    };
  },
});
