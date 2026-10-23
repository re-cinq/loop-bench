The `beforeSession` call now sits inside the `try`, so a throw from it reaches `onError` and `afterSession`. The commit is pushed to `loop-bench/94`, and the branch is level with its upstream and with `origin/main`.

**What I did (one round, one facet):**
- **Red:** wrote `src/orchestration/chatOrchestrator.beforeSessionOnError.test.ts`, which asserts `onError` receives the thrown error and the session. It failed for the right reason: `onError` was never called.
- **Green:** moved `if (hooks?.beforeSession) await hooks.beforeSession(session);` inside the `try` in `chatOrchestrator.ts`. The new test passes.
- **Refactor:** none needed.
- Ticked the first facet in `.lore/dod.md` and ran prettier on the two changed source files.
- Commit `c5133a5` has the Co-Authored-By line from the reminder.

**What I did not do:**
- **Acceptance test not run.** I left `chatOrchestrator.beforeSession.acceptance.test.ts` alone, as the brief requires, so its status is unverified here. CI will judge it.
- **No round brief existed,** so there was no CI verdict to act on. Red tests I wrote: 0. Regressions: none known, since I ran only my own test.
- **No typecheck, lint, build, or full suite,** per the pod rules.
- **Lore tools unavailable.** The `lore` MCP server failed to connect, so I could not run `lore-query-trace` before editing or record anything through `lore_*`.
- **Test runner.** `npx jest` on its own failed with an ESM error. The repo's `npm test` flag, `node --experimental-vm-modules`, worked.

**Open facets for the next round:**
- Update `specs/hal-engine-config-hooks/spec.md`. Line 26 already describes the new guarantee and cites the acceptance test, but the statement about what a hook can assume (never allocated versus allocated and finished) should be checked against the ticket.
- Add the CHANGELOG entry saying what changes for an existing consumer. The behaviour change is that `onError` and `afterSession` now fire on a `beforeSession` throw.

**Observation, not acted on:** the `instanceof Error` gate on `onError` is out of scope per the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block in chatOrchestrator.ts","tdd_next":"Update specs/hal-engine-config-hooks/spec.md with the new beforeSession guarantee"}}