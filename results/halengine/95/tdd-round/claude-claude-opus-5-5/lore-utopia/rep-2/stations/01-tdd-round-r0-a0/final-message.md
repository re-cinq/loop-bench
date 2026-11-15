I closed the first facet: the orchestrator now calls `onError` for every rejection, not only for ones that are already an `Error`. The change is committed and pushed to `loop-bench/95`, it was already up to date with `origin/main`, and `git status` shows nothing unpushed.

**Red:** I added one test to `src/orchestration/chatOrchestrator.test.ts:311`, "wraps an undefined rejection in an Error whose cause is the original value". It covers the ticket's `undefined` case and the `cause` requirement, which the acceptance tests don't check. It failed for the expected reason: `onError` was skipped and received nothing.

**Green:**
- **New helper:** `toError` in `src/orchestration/orchestratorHelpers.ts`. An `Error` passes through as the same instance. Anything else is wrapped in an `Error` with a readable message (the string itself, otherwise JSON or `String()`), and the original value is kept as its `cause`.
- **The catch block** in `chatOrchestrator.ts` now calls `onError(session, toError(error))` and no longer checks `instanceof Error`. It still re-throws the original value, so callers see no change.
- **Test results:** I ran only `chatOrchestrator.test.ts`, and all 27 tests pass, including the three existing `Error`-instance tests. I didn't run the acceptance tests; CI will.
- **Test file change:** I widened the parameter of the `createErrorProvider` test helper from `Error` to `unknown`. No existing test was edited.

**Refactor and traceability:**
- **New spec link:** In `specs/hal-engine-config-hooks/spec.md`, I added a sentence and a link to my test on the `onError` guarantee: the wrapper keeps the thrown value, `undefined` included, as its `cause`.
- **Moved links:** My new test pushed later tests down by 25 lines. There's no reanchor script, so I recomputed each link by test title: 15 links across three spec files.
- **Formatting:** Prettier is configured for `.ts` files only here. Running it on the Markdown added blank lines, so I took those back out.
- **Spec anchor:** I found no way in this repo's `tests.list` setup to tag a test with its spec anchor, so the test carries only the spec link.
- **`.lore/dod.md`:** I ticked facet 1. Facet 2 (existing `Error` tests stay green without edits) passed locally, but I left it unticked for CI to confirm.

Red tests: 1, the one I wrote, now green. Regressions: 0 as far as this one file shows. I can't see CI's verdict yet, and there was no round brief.

Problems I noticed and didn't touch:
- `AGENTS.md` links to a test called "commits every entry before the next user message", which doesn't exist anywhere in `src/`.
- The `CLAUDE.md` command block lists `npm test` without the `--experimental-vm-modules` flag that `jest` needs when run directly.

Next round: the `CHANGELOG.md` entry under `## [Unreleased]`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce a non-Error rejection to an Error (cause preserved) so onError always fires in chatOrchestrator.ts","tdd_next":"Add a CHANGELOG.md entry under [Unreleased] describing the onError behaviour change for existing consumers"}}