import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  document: defineTable({
    body: v.string(),
    userId: v.id("users"),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id("documents")),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"]),
});
