CI's findings on `6d9cb7c` are fixed except for the two in the acceptance test, which I can't correct in this round. The branch is pushed and up to date with its upstream and with `origin/main`. The ticket is not done: the acceptance test is still red.

**What's blocked:** `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is itself wrong, and the rules say that is a failed round.
- Line 30 passes `baseSystemPrompt` to `PromptBuilder`, but `PromptBuilderConfig` has `identity`. That is the typecheck failure.
- The test at line 40 makes three `expect` calls, and the lint rule allows one. That is the eslint failure at 40:3.

Fixing either means editing the acceptance test, which I did not do. It needs its RED-phase author to correct it.

**Done this round (commit `195da86`, pushed):**
- **sessionSave lint (my own test from the last round):** the two duplicated test bodies now share one helper, so each test makes a single assertion. The `beforeSession` test now has its spec link.
- **Spec (facet 2):** `specs/hal-engine-config-hooks/spec.md` has a new section, "A throwing `beforeSession`". It states the rejection, `onError`, `afterSession`, and the save. It also states what a hook can assume. The `beforeSession` line is removed from the out-of-scope list. The `afterSession` link in `specs/hal-engine-session-write-signal/spec.md` moved from L73 to L87.
- **CHANGELOG (facet 3):** an entry under `### Changed` in Unreleased, with a migration note. It says `afterSession` now runs for a turn that fails in `beforeSession`.
- **Decision recorded in the spec:** `afterSession` runs after a failed `beforeSession`. A deployer who allocates in `beforeSession` needs the release on that path too. A hook that must tell "never started" from "finished" uses `onError`, which fires first in the same turn. A non-`Error` throw skips `onError`, so that signal is missing for it.

**Verification:**
- `sessionSave.test.ts` passes 7/7 locally. I ran it with `node --experimental-vm-modules`, the same flag as `npm test`.
- I did not run the acceptance test here, per the pod rules.
- Prettier reports the changed files as formatted.
- I did not run lint or the typechecker, per the pod rules.

**Notes:**
- Red tests: CI named none in the test step. The three lint findings were on my own sessionSave test from the last round, so they count as mine. Regressions: none identified.
- The lore MCP server failed to connect. I could not run `lore-query-trace` for `tests_covering` and read the test files directly.
- The new "what a hook can assume" bullet has no test link. Nothing pins it yet.
- Unrelated, not touched: the config-hooks spec says the out-of-scope properties are "owned by no issue in this epic", but the usage-accounting item is #93 and the `instanceof Error` gate has its own issue.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong: line 30 uses PromptBuilder key baseSystemPrompt (real key is identity), and the test at line 40 has three expects against max-expects 1; it must be corrected by its RED-phase author before the typecheck and eslint steps can go green."}}