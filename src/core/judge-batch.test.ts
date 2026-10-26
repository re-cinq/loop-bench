import { describe, expect, it } from "vitest";
import { batchRequestLine, cellsWithoutOpenJob, promptKey, repliesByPromptKey, type BatchManifest } from "./judge-batch.js";

const outputLine = (prompt: string, parts: Array<{ text: string; thought?: boolean }> | null): string =>
  JSON.stringify({
    status: "",
    request: { contents: [{ role: "user", parts: [{ text: prompt }] }] },
    response: parts === null ? {} : { candidates: [{ content: { parts } }] },
  });

describe("batchRequestLine", () => {
  it("wraps the prompt as the one user turn of a request", () => {
    expect(JSON.parse(batchRequestLine("grade this"))).toEqual({ request: { contents: [{ role: "user", parts: [{ text: "grade this" }] }] } });
  });
});

describe("repliesByPromptKey", () => {
  it("matches a reply to the prompt that was sent, whatever order the lines come back in", () => {
    const output = [outputLine("second", [{ text: "B" }]), outputLine("first", [{ text: "A" }])].join("\n");

    expect(repliesByPromptKey(output)).toEqual(
      new Map([
        [promptKey("first"), "A"],
        [promptKey("second"), "B"],
      ]),
    );
  });

  it("joins the text parts of a reply and drops thought parts", () => {
    const output = outputLine("p", [{ text: "weighing it", thought: true }, { text: '{"correctness":' }, { text: "4}" }]);

    expect(repliesByPromptKey(output)).toEqual(new Map([[promptKey("p"), '{"correctness":4}']]));
  });

  it("leaves out a line whose response holds no candidate", () => {
    expect(repliesByPromptKey(`${outputLine("blocked", null)}\n\n`)).toEqual(new Map());
  });
});

describe("cellsWithoutOpenJob", () => {
  const manifest: BatchManifest = {
    jobs: [
      { name: "open", model: "m", submitted_at: "t", output_uri: "gs://b/o/", cells: { k1: ["93/a", "93/b"] }, collected_at: null },
      { name: "closed", model: "m", submitted_at: "t", output_uri: "gs://b/o/", cells: { k2: ["94/c"] }, collected_at: "t" },
    ],
  };

  it("keeps 94/c and 95/d and drops the two cells a running job holds", () => {
    expect(cellsWithoutOpenJob(manifest, ["93/a", "93/b", "94/c", "95/d"])).toEqual(["94/c", "95/d"]);
  });
});
