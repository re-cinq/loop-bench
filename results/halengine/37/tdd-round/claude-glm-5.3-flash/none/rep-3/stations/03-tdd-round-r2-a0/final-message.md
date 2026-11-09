Everything is delivered and verified: branch pushed (`27cbbd1..2da477e`), in sync with upstream, 0 commits behind origin/main, merge clean.

**What this round repaired (all findings from the brief):**

- **typecheck (2 errors)** — the root cause: CI's `tsc` resolved the `ajv` type imports to an **ajv@6 copy** (on main, root `node_modules/ajv` *is* eslint's hoisted ajv@6; its namespace has no `default` and its `ErrorObject` carries `dataPath`, not `instancePath` — exactly the two errors). `registry.ts` no longer imports types from `ajv` at all: the validator and its error objects are minimal structural types local to the module, cast at the `createRequire` seam (the repo's existing `requireOptionalPeer` pattern).
- **The likely test-step failure, same root cause** — with ajv@6 at runtime, rejection messages would lose the field path, failing the no-leak acceptance assertions. `describeSchemaErrors` now reads `instancePath ?? dataPath`, so the path survives whichever copy loads. The truncated test log's vertex stack turned out to be jest rendering a `console.warn`; `providerFactory.test.ts` passes locally (5/5).
- **npm ci regression** — this branch's ajv upgrade had dropped main's `@emnapi/core`/`@emnapi/runtime` lock entries; `npm ci` failed outright (verified with npm 11). Restored from main; `npm ci` now passes and installs ajv@8 at root.
- **eslint (8 errors)** — weather-tool comment to one line (embedded copy in `docs/adding-a-tool.md` synced by hand), unused `Logger` import dropped, three multi-expect registry tests and the orchestrator loop test merged to single `toEqual`s, nested ifs flattened into a guard-clause helper. Test titles unchanged.
- **Spec anchors** re-pointed (`registry.test.ts#L31/#L117/#L131`); anchor-names (402 citations), spec-links (0 misplaced) and spec-status all green. Prettier clean. `registry.test.ts` + `chatOrchestrator.test.ts`: 30/30 green locally.

**Named, not acted on:** `check-doc-blocks.mjs` exits 1 at HEAD before *and* after my changes (verified byte-identical finding sets) — 16 pre-existing marker/fence findings across README.md, `.specify/spec.md`, `docs/adding-a-tool.md`, plus 34 spike blocks; that would redden CI's `docs:check` independent of this ticket. The four acceptance boxes in `.lore/dod.md` stay unticked for CI to confirm; the repair facet is recorded.

**Red tests:** 0 mine, 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI verdict on 27cbbd1 — ajv type decoupling, lock restore, and all eight eslint findings","tdd_next":"acceptance green (CI verdict on this push)"}}