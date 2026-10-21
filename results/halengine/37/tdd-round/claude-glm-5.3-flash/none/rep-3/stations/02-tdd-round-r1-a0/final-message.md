The round is complete: committed, pushed, branch up to date with `origin/main`, working tree clean, upstream not ahead.

## Round summary

**Facet closed (red → green):** `Compile static ToolDefinition.inputSchema at ToolRegistry.register time ... and cache compiled validators for function-valued sources by schema object reference (WeakMap)`. The red test — `throws at register time naming the tool when a static inputSchema cannot be compiled` — failed against the old per-call compile; after implementing `compileSchema` + `staticValidators` + a schema-object-keyed `WeakMap`, my file (`registry.test.ts`, rewritten) runs **5/5 green**.

**CI findings owed from the round brief, all fixed:**
- **typecheck (3 errors in `registry.ts`)** — swapped `import Ajv from 'ajv'` for the named import and dropped the `ErrorObject` type import in favour of the `ValidateFunction` error shape. This is the exact fix a prior run of this ticket used for the identical failure (commit `bbac8a1` in this clone's history: "under NodeNext the default import of the CJS ajv package does not expose construct signatures"), so it's precedent, not guesswork.
- **eslint no-duplicate-code** — `registry.test.ts` no longer clones the acceptance test; it now carries the unit criteria the acceptance file doesn't (register-time throw, WeakMap freshness, extra-property passthrough with `toEqual` and exactly one call, wrong-type naming, `Unknown tool` pin).
- **eslint prefer-early-return + max-member-chain (acceptance file 141:9 / 143:34)** — control-flow only, per the rule's own prescription (negated guard on the tail, happy path flat; `firstContent` bound). No assertion touched.

**The named test failure (`providerFactory.test.ts` vertex arm): 0 red tests are mine, 0 regressions.** That test builds a real `VertexAI` client in the providers layer, which neither commit on this branch touches (the lock diff added only `ajv`). A direct probe of `new VertexAI({project:'p', location:'europe-west4'})` constructs fine in this pod, and the log's `/privatesrc/…` paths show it came from the previous pod's local run, not GitHub's runner, where main runs the same test green. I left it alone deliberately.

**Left for the next round:** facet 4's remainder — `chatOrchestrator.test.ts` unit coverage and the docs set (`example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, ADR-002), plus the still-uncited spec statement on static compiled-once reuse, now appended to `dod.md` as an unchecked facet (it needs an observable seam; a test over source text is not allowed). Spec citations for every test I added were updated and `check-spec-anchor-names` passes; `dod.md` facets 1–3 are ticked.

**Smells noticed, not acted on:** registering a function-valued source over a previously static tool name leaves a stale `staticValidators` entry (harmless leak; the duplicate-name refusal tracked upstream as #171 addresses the class), and `example/weather-tool.ts` still carries its stale "inputSchema does not enforce" comment (facet 4's docs work).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"register-time inputSchema compilation with WeakMap caching for function-valued sources, plus all named typecheck/eslint findings from the last CI verdict","tdd_next":"facet 4: chatOrchestrator unit tests and the docs set (example, adding-a-tool, README, .specify, ADR-002)"}}