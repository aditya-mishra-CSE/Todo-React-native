import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ConvexError → Used to throw custom errors from server functions.
// v → A validator for arguments (v.string(), v.id("todos") etc.). Ensures correct data types.
// mutation → Defines a function that changes data (insert, update, delete).
// query → Defines a function that reads data (fetching info).


export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});

// This is a query (read-only).
// ctx.db.query("todos") → gets the todos table.
// .order("desc") → sort in descending order (latest first).
// .collect() → fetch all results as an array.
// Returns the list of todos.


export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });

    return todoId;
  },
});

// This is a mutation (write operation).
// args: { text: v.string() } → requires a text string as input.
// ctx.db.insert("todos", { ... }) → adds a new todo to the DB.
// Sets isCompleted: false by default.
// Returns the new todo’s ID.
// 👉 Meaning: Create a new todo with text and mark it incomplete.

export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo not found");

    await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();

    // Delete all todos
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deletedCount: todos.length };
  },
});
