// The judge's work as a Vertex batch job: one JSONL request per distinct prompt, matched back to its cells by a hash of the prompt.
import { createHash } from "node:crypto";
import { z } from "zod";

export const BatchJobSchema = z.object({
  /** The Vertex resource name, what status and collect ask about. */
  name: z.string(),
  model: z.string(),
  submitted_at: z.string(),
  output_uri: z.string(),
  /** Prompt hash to the cell folders, relative to the results folder, that prompt judges. Two cells with the same diffs share one request. */
  cells: z.record(z.array(z.string())),
  /** Set once the job reached an end state and its answers were applied; a cell whose answer did not parse is open for the next submit. */
  collected_at: z.string().nullable().default(null),
});
export type BatchJob = z.infer<typeof BatchJobSchema>;

export const BatchManifestSchema = z.object({ jobs: z.array(BatchJobSchema) });
export type BatchManifest = z.infer<typeof BatchManifestSchema>;

export const promptKey = (prompt: string): string => createHash("sha256").update(prompt).digest("hex");

export function batchRequestLine(prompt: string): string {
  return JSON.stringify({ request: { contents: [{ role: "user", parts: [{ text: prompt }] }] } });
}

const TextPartsSchema = z.array(z.object({ text: z.string().optional(), thought: z.boolean().optional() }));
const OutputLineSchema = z.object({
  request: z.object({ contents: z.array(z.object({ parts: TextPartsSchema })).min(1) }),
  response: z.object({ candidates: z.array(z.object({ content: z.object({ parts: TextPartsSchema.optional() }).optional() })).optional() }).optional(),
});

const textOf = (parts: z.infer<typeof TextPartsSchema>): string => parts.map((part) => part.text ?? "").join("");

/** The judge's reply per prompt hash, read from a job's output file: Vertex echoes each request beside its response, in no promised order. A line with no answer is left out. */
export function repliesByPromptKey(outputJsonl: string): Map<string, string> {
  const replies = new Map<string, string>();

  for (const line of outputJsonl.split("\n").filter((text) => text.trim() !== "")) {
    const parsed = OutputLineSchema.safeParse(JSON.parse(line));
    const answer = parsed.success ? textOf((parsed.data.response?.candidates?.[0]?.content?.parts ?? []).filter((part) => part.thought !== true)) : "";

    if (parsed.success && answer !== "") {
      replies.set(promptKey(textOf(parsed.data.request.contents[0]?.parts ?? [])), answer);
    }
  }

  return replies;
}

/** The cells no open job is waiting on. */
export function cellsWithoutOpenJob(manifest: BatchManifest, cells: readonly string[]): string[] {
  const waiting = new Set(manifest.jobs.filter((job) => job.collected_at === null).flatMap((job) => Object.values(job.cells).flat()));

  return cells.filter((cell) => !waiting.has(cell));
}
