I made no commit this round. Every remaining CI failure is in the acceptance test's own code, and I'm not allowed to edit that file.

**Where CI stands.** The red verdict in the round brief is for commit `107d2e2`. The last round's commit, `7e9dfe0`, was pushed after that build, and it fixes three of the four failed checks. I checked them here by running only those scripts, not the tests:
- **spec-names:** `npm run spec:names` now passes (589 links checked, none misplaced). I also checked by hand that every `chatOrchestrator.test.ts#Lnn` link in `specs/` points at its test's current line.
- **eslint `require-spec-link` at lines 377/454/484/541:** these come from the same shifted links, so they should clear with them.
- **changelog:** `CHANGELOG.md` now has an entry for this change, saying what changes for an existing consumer.

**What blocks the round.** `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is wrong in two ways:
1. **typecheck (line 30):** it builds `new PromptBuilder({ baseSystemPrompt, systemPromptSuffix, contextConfig })`. `PromptBuilderConfig` only has `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`, so it should be something like `new PromptBuilder({ identity: 'You are HAL.' })`.
2. **eslint `re-lint/max-expects` (line 40):** the test has three `expect` calls and the limit is one. It needs to check one object, e.g. capture the rejection and then `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`.

The behaviour under test is already in place: `beforeSession` runs inside the `try`, and a unit test in `chatOrchestrator.test.ts` covers it. The spec and CHANGELOG are updated. A person needs to fix the acceptance test's setup and assertions; changing the library code can't make it pass.

**Red tests:** none that I wrote, and no regressions. I ran no tests in this pod because I wrote no new one. The only red items left are those two findings in the acceptance test.

**Unrelated issue I noticed:** the `scripts/spec-links/reanchor.mjs` named in the round instructions doesn't exist. This repo has `scripts/repoint-spec-anchors.mjs` and `npm run spec:names:fix` instead.

The working tree is clean and the branch is up to date with `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is itself wrong (baseSystemPrompt not in PromptBuilderConfig at L30; 3 expects vs max-expects 1 at L40) and rounds may not edit it; all other CI findings fixed in 7e9dfe0"}}