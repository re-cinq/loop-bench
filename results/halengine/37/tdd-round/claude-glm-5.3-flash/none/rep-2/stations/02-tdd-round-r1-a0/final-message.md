The round is complete and landed. Summary:

**CI findings from 81b09b0 — all repaired:**
- **typecheck** (`registry.ts:43`): ajv's entry point is CommonJS, so under NodeNext the default import binds the module namespace, not the class — switched to the named export `import {Ajv} from 'ajv'`. Ran the failed step's exact command (`tsc --noEmit`): exits 0.
- **`preserve-caused-error`** (`registry.ts:57`): register-time throw now carries `{cause: error}`.
- **`prefer-early-return` + `max-member-chain`** (acceptance test): flipped the `round === 2` guard so the tail is guarded and the happy path runs flat (`round !== 2` — same semantics for every round), and split `lastMessage.content[0]?.content` into two statements. Assertions untouched.
- **`no-duplicate-code`** (23-line clone acceptance↔unit test): rewrote `registry.test.ts` with distinct fixtures.

**Facet 4 closed:** six unit tests in `registry.test.ts` (missing-required, wrong-type rejection with no value echo, extra-property passthrough with `toEqual`, unknown-tool throw pinned, register-time schema reuse across ten calls, per-call function-valued schemas) — 6/6 green; one tool-loop test in `chatOrchestrator.test.ts` driving a rejected call to a corrected retry — 23/23 green. All eight spec statements now cite tests (Status → Shipped); `spec:names`, `check:spec-links`, `check:spec-status` all pass. Updated `example/weather-tool.ts` (no more defensive cast/default of the required field), `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `ADR-002-response-validation.md`; doc-blocks regenerated via `docs:fix` (0 findings); changelog gate passes; branch merged with `origin/main` (already up to date) and pushed.

**Red tests:** 0 mine (my tests went green the round they were written); 0 regressions — the previous red build was lint/typecheck errors, not failing tests.

**Named, not acted on:** 3 pre-existing `docs:check-paths` findings (`dist/index.d.ts`/`dist/index.js` referenced by `.specify/spec.md:311` and the npm-release spec — they exist only after a build); the README Quick Start's `input.city as string` cast inside the generated block from `example/server.ts` (file not in this ticket's list); the `Unknown tool` throw stays a throw by design (tracked issue).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"unit tests in registry.test.ts and chatOrchestrator.test.ts with all spec statements cited, plus repair of every CI finding from 81b09b0 (ajv NodeNext import, cause, early-return, member chain, duplicate fixture)","tdd_next":"acceptance green"}}