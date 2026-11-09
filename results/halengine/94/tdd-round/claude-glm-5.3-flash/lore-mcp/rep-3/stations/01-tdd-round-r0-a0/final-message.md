`origin/main` is already an ancestor of the branch — no merge drift, nothing further to push. The round is complete.

## Round summary

**Facet closed:** *Move `beforeSession` inside the `try` block in `chatOrchestrator.ts`* — plus the two facets inseparable from pushing it (spec statement, CHANGELOG entry).

**RED** — wrote one test, `runs with the session untouched when beforeSession throws` (`src/orchestration/chatOrchestrator.test.ts:145`), pinning the ticket's explicit question: `afterSession` still runs when `beforeSession` throws, and sees the session exactly as the caller passed it. Confirmed red for the right reason: the rejection propagated but `afterSession` never ran (`entriesSeenByAfterSession` was `undefined`); the 23 pre-existing tests in the file stayed green.

**GREEN** — the least code: the `beforeSession` call moved inside the `try` (`src/orchestration/chatOrchestrator.ts:91`), so its throw reaches the same `catch`/`finally` as any other turn failure. 24/24 green in the file. The decision the ticket asked for is recorded: `afterSession` fires even for a failed `beforeSession`, and may assume the turn never started — no entry appended or rewritten, no provider or tool run.

**REFACTOR/docs** — `specs/hal-engine-config-hooks/spec.md` moves the guarantee out of "Measured semantics — out of scope" into a new "When beforeSession throws" section (both statements cite tests; the out-of-scope section now lists two properties); CHANGELOG gains an `Unreleased → Fixed` entry with a migration note for consumers whose `afterSession` releases `beforeSession` allocations; `.lore/dod.md` facets ticked. Spec anchors repointed: 20 by the repo's `repoint-spec-anchors.mjs`, 2 by hand (this spec is authored on-branch, so the script skips it); `check-spec-anchor-names`, `check-spec-links`, `check-spec-status` and `repoint --check origin/main` all exit 0. Prettier run on the changed `.ts` files (already clean; its CI scope is TS-only, so the `.md` files are out of scope). No lint, typecheck, build, or full suite ran here — CI judges those, and this pod ran no acceptance test: the branch's one red test is the ticket's own RED acceptance test, which this change turns green pending CI's verdict. Red tests: 1 (the ticket's own, now expected green); regressions: 0.

**Out-of-scope smells noticed, not acted on:** the `catch` still gates `onError` on `error instanceof Error` (its own issue per the ticket); `afterModelResponse` still receives per-round `lastUsage` rather than a sum across tool rounds (HALEngine#93).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"acceptance green"}}