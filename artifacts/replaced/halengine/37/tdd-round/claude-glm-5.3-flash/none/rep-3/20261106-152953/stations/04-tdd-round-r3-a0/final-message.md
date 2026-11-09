Pushed and verified — branch up to date with its upstream, 0 commits behind `origin/main`.

## Round summary

**CI findings from the previous push (6419ff9) — 3 reported, 1 real:**

- **eslint `chatOrchestrator.test.ts:535` `re-lint/prefer-early-return` — real, fixed.** The round-two branch wrapped the happy path while two statements dangled; flipped to `if (requests.length !== 2)` guarding the tail. Scripted rounds are unchanged (call-1 → corrected call-2 → final text), and the edit is line-count-neutral so the spec anchor at `#L523` is stable. I verified the fix against the rule's source (`MIN_WRAPPED = 4`, wrapped > tail): neither remaining `if` qualifies.
- **typecheck (TS2693 `'Ajv'` as value, TS2339 `instancePath`) — does not reproduce.** `tsc --noEmit -p tsconfig.json` passes on this tree (0.8 s, 415 MB peak). Both errors are exactly what ajv**@6** typings produce (`Ajv` interface-only, `dataPath` not `instancePath`), and ajv@6 sits at `node_modules/ajv` on **main's** install — only this branch's lock moves ajv@8.20.0 to the root. Lock verified in sync (`npm ci --dry-run` clean).
- **test — does not reproduce.** The snippet in the brief is jest's `console.warn` deprecation frame from `providerFactory.test.ts`, which passes here (`5 passed`), as do the branch's registry/orchestrator suites (`29 passed`). Both failures are consistent with one root cause: a reporting runner whose `node_modules` predates this branch's `npm ci`. The push triggers a fresh install; if the verdict recurs, it lands as the next round's brief.

**Facet closed: static schema compiled once** (the last unchecked facet). First seam was blind and I proved it before shipping: ajv's `_cache` is keyed by schema object **identity**, so mutating a registered schema's rules changes nothing even under a re-compiling mutant. The shipped pin instead corrupts the schema object into invalid JSON Schema after `register` and runs ten `execute` calls past it — any execute-time re-read/re-compile throws. Demonstrated red against a fresh-validator-per-execute mutant, green on the real code; `registry.ts` left byte-identical.

**Also:** cited the last uncited statement in `specs/hal-engine-tool-input-validation/spec.md` (spec-link/anchor-name/status scripts all pass locally). Left `| Status | In Progress |` — full coverage now *entitles* `Shipped`, but the branch's last verdict was red, so the flip is recorded as a new unchecked facet. Unrelated smells noticed, not acted on: the deprecation warning in `@google-cloud/vertexai` 1.10.4, and `registry.ts` logging `name` (not values) on rejection — already value-free.

Red tests: 0 mine, 0 regressions found locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pin that a static tool's inputSchema is compiled once at register and reused across ten execute calls","tdd_next":"flip specs/hal-engine-tool-input-validation Status to Shipped once CI is green, else CI's named findings"}}