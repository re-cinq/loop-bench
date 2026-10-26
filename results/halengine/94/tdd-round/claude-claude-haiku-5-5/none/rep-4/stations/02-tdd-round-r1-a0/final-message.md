The round is pushed, but the ticket is blocked: the acceptance test itself is wrong, and I did not edit it.

**What CI reported and what I did**

- **spec-names (23 findings):** These were `#Lnn` citations in `hal-engine-architecture`, `hal-engine-config-hooks` and `hal-engine-tool-input-validation` pointing at `chatOrchestrator.test.ts` lines. My inserted test shifted that file by 18 lines. I ran `scripts/check-spec-anchor-names.mjs --fix` and it repointed 21 of them by test name. `npm run spec:names` now reports clean. I restored the architecture spec before re-running the fix, because prettier had added blank lines I did not want.
- **eslint `require-spec-link` on `chatOrchestrator.test.ts`:** The 136–291 findings were the same drift. The new test at line 116 had no citation of its own, so I added one on the measured-semantics line in `specs/hal-engine-config-hooks/spec.md`. I did not run eslint locally.
- **changelog:** Added a `Changed` entry under Unreleased in `CHANGELOG.md`. It says `onError` and `afterSession` now run for a `beforeSession` throw, that the rejection is unchanged, and carries a migration note for `afterSession` consumers.
- **dod.md:** Ticked the spec and CHANGELOG facets. The acceptance test box stays unticked.

**Blocked: the acceptance test is wrong**

`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` has two problems that I cannot fix without editing an acceptance test:

1. **typecheck (line 30):** `new PromptBuilder({baseSystemPrompt: ...})`. `PromptBuilderConfig` has no `baseSystemPrompt` field; it takes `identity`, plus optional `domainContext`, `responseGuidelines` and `toolPreamble`.
2. **eslint `re-lint/max-expects`:** The test makes three `expect` calls, and the rule allows one.

Fixing either means editing an acceptance test, which the brief forbids. Someone needs to correct the test's `PromptBuilder` construction and split or merge its assertions, or confirm that the rule should be relaxed.

**Test accounting for this round**

- Red tests I wrote: one lint finding on the case I added in an earlier round, which lacked a spec citation. Fixed.
- Regressions I caused: the 23 spec-names citations and the 5 eslint `require-spec-link` findings were all drift from my earlier insertion. Fixed by repointing, not by editing tests.
- I ran no tests, typecheck, or lint in this pod, per the brief.

**Branch state**

The commit `5955142` is pushed to `origin/loop-bench/94`. `git status` shows the branch in sync with upstream. `origin/main` was already an ancestor, so no merge was needed.

The lore MCP tools did not load in this session, so I could not query the graph (`lore-query-trace`) before editing or read the full CI verdict. I worked from the truncated verdict in the round brief.

Unrelated smells, not touched: the `instanceof Error` gate on `onError` (out of scope per the ticket) and the `lastUsage` under-count in `afterModelResponse` (HALEngine#93).

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong: line 30 passes baseSystemPrompt which PromptBuilderConfig lacks (typecheck), and it has 3 expects against re-lint/max-expects; needs correcting by someone allowed to edit acceptance tests"}}