The changelog and spec are done and pushed, but the round is blocked on the acceptance test itself. CI's two remaining red checks are in that file, and the rules forbid editing it.

**What's blocked**
- **typecheck:** `chatOrchestrator.beforeSession.acceptance.test.ts:30` passes `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`. `PromptBuilderConfig` declares none of them and requires `identity`, which the test omits.
- **eslint:** the same file's test at line 40 has three `expect` calls against `re-lint/max-expects` of 1.

Fixing either means editing the acceptance test, so I left both alone. A person needs to correct the test file. Until they do, CI stays red.

**What I did**
- **CHANGELOG (fixes the `changelog` failure):** added a `### Changed` entry under Unreleased. It says a `beforeSession` throw now reaches `onError` and `afterSession`, that the rejection is unchanged, and gives the migration note for existing consumers.
- **Spec:** moved the `beforeSession` bullet out of "Measured semantics — out of scope" into "Installing hooks through config", with the new guarantee. It states that `afterSession` can assume no provider call and no tool ran, but cannot tell "never started" from a later failure. A deployer who needs that distinction records it from `onError` or their own `beforeSession`. The out-of-scope intro now says two properties instead of three.
- **Production code:** unchanged this round. `beforeSession` was already inside the `try` from the previous round.
- **`.lore/dod.md`:** ticked the spec and CHANGELOG facets, and added an unchecked facet for the acceptance-test fix.

**Git state**
- Committed `3c2938d` and pushed it. `git status` reports the branch is not ahead of `origin/loop-bench/94`.
- Merged `origin/main` in. It produced no output, and the branch is still not ahead of its upstream.

**Tests**
- I ran no tests in this round, and I wrote none.
- No red test in CI is one I wrote. Regressions: none reported.

**Smells noticed, not touched**
- The `instanceof Error` gate on `onError` is out of scope for this ticket, per the ticket.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong (typecheck: undeclared PromptBuilderConfig props and missing identity; eslint: 3 expects vs max-expects 1); must be corrected by a person, the round may not edit it"}}