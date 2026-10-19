import { z } from "zod";

export const HarnessSchema = z.enum(["claude", "gemini", "codex"]);
export type Harness = z.infer<typeof HarnessSchema>;

export const StationSchema = z.enum(["dod", "tdd-round", "repair-build"]);
export type Station = z.infer<typeof StationSchema>;

export const ContextModeSchema = z.enum(["none", "lore-mcp"]);
export type ContextMode = z.infer<typeof ContextModeSchema>;
