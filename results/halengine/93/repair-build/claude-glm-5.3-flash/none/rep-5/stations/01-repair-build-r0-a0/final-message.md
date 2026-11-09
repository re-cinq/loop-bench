Everything landed. `git status -sb` shows the branch is even with its upstream, and `origin/main` merges clean (already up to date — no drift on this branch).

## Summary

The verdict named 4 eslint errors in `src/orchestration/orchestratorHelpers.test.ts`: three `re-lint/require-spec-link` and one `re-lint/max-expects`.

**The cause:** `require-spec-link` is inverted from its error message's wording — reading the rule source (`node_modules/@re-cinq/eslint-plugin-re-lint/dist/rules/require-spec-link.mjs`) shows a test counts as linked only when a **spec/ADR statement** carries a `([validated by](test.ts#Lnn))` link whose anchor line falls inside the test's span. The new `accumulateUsage` tests had no statements citing them; the sibling `shouldContinueToolLoop` tests were linked from `specs/hal-engine-architecture/spec.md:340-343`, which is why only the new ones failed.

**The fix (both findings, in this visit):**
1. **`max-expects`** — split the two-expect test into two one-expect tests (`orchestratorHelpers.test.ts:35` and `:40`), one per direction of the undefined operand, as the rule's guidance prescribes.
2. **`require-spec-link`** — added three statements to `specs/hal-engine-config-hooks/spec.md` (right under the summed-usage statements this feature introduced) citing each `it(` line: `#L29` (sum), `#L35` + `#L40` (silent round drops out from either side), `#L45` (nothing reported → `undefined`).

**Verified without running eslint** (which does not fit this pod), using the rule's own parser via a small node script and the repo's cheap non-eslint gates, since my spec edit could affect them:
- Link index: anchors `{11,15,19,23,29,35,40,45}` — every `it(` span covered, no unlinked test remains.
- `npm run check:spec-links` → `misplaced: 0`; `npm run check:spec-status` → `0 findings`; `npm run spec:names` → 594 citations name their tests; `node scripts/repoint-spec-anchors.mjs --check origin/main` → 0 stale/unresolved/mislabelled (config-hooks spec is expectedly skipped as freshly authored).
- Ran the one edited test file the way CI does (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/orchestrationHelpers.test.ts`): **8 passed**.
- `npx prettier --write` on the changed .ts file → already formatted; no eslint, typecheck, or build run here.

Committed as `bb946f4 test(orchestrator): link usage tests to spec`, pushed, branch is not ahead of upstream. (Note: the `lore_*`/`lore-query-trace` MCP tools are not reachable in this pod — no CLI and none in the tool list — so prior-attempt history came from `git log` on the file, which shows only the initial commit and this branch's two commits.)

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests had no spec statements citing them (require-spec-link) and one test had 2 expects — split it in two and added citing statements to specs/hal-engine-config-hooks/spec.md"}}