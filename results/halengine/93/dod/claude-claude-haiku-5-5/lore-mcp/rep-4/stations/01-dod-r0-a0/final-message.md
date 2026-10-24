Ticket #93 is defined by two red acceptance tests, committed and pushed to `loop-bench/93` as `c02fe12`. The branch already includes `origin/main` and is not ahead of its upstream.

**Triage: `direct`.** `createChatOrchestrator` and `processMessage` are the real entry points, and a scripted `AIProvider` drives them, so no seam is missing.

**Tests** (`src/orchestration/chatOrchestrator.usage.acceptance.test.ts`):
- **reports the sum of every provider call in a turn that ran two tool rounds**: a three-call turn reporting 120, 340 and 560 tokens should hand the hook 1020 total.
- **counts the rounds that reported usage and reports nothing when no round did**: a silent round is skipped in the sum, and an all-silent turn passes `undefined`.
- The existing no-tool test at `chatOrchestrator.test.ts:236` is named in `.lore/dod.md` as the pin that must stay green and unedited. I did not run it.

**Red bar** (the command I ran, with the failure output):
```
node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.usage.acceptance.test.ts
```
```
● reports the sum of every provider call in a turn that ran two tool rounds
    - "inputTokens": 900,  + "inputTokens": 500,   (outputTokens 120 vs 60, totalTokens 1020 vs 560)
● counts the rounds that reported usage and reports nothing when no round did
    - "inputTokens": 600,  + "inputTokens": 500,   (totalTokens 680 vs 560)
Tests: 2 failed, 2 total
```
The hook receives only the final provider call's usage, which is the ticket's claim.

**Shape chosen: sum.** The single `usage` argument keeps its type, and the existing no-tool test still applies unchanged. The "both" shape is rejected in the DoD: no consumer receives per-round usage today, so a per-round array would widen the public surface for nothing.

**Spec.** I replaced the under-counting bullet in `specs/hal-engine-config-hooks/spec.md` with a new "Usage reported to afterModelResponse" section. Its statements are linked to the two red tests, so they are ahead of the code until the orchestrator changes. I did not touch the `| Status |` row. The `onError` gate bullet stays in the out-of-scope list as a separate finding.

**Gaps and notes:**
- Acceptance criterion 4 (the type makes the sum unambiguous) is a type and documentation property, not runtime behaviour. It is listed as a facet, not a test.
- The CHANGELOG entry and the JSDoc on the hook are facets for the implementation round.
- The Lore MCP server failed to connect this session, so I could not query Lore conventions or pass `repo` on `lore_*` calls.
- `scripts/spec-links/reanchor.mjs` does not exist in this repo, so I verified the spec link line numbers by hand.
- I ran only the new file. Lint, typecheck, build and prettier are for CI; I ran only the formatter on the new test file.
- The Lore list command in `scripts/lore-list-tests.mjs` emits no `spec` field, so the spec link is recorded only in the spec's parenthetical.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}