I pushed this round's work, but CI can't go green on this branch: the acceptance test itself fails the typecheck and lint steps, and I'm not allowed to edit it. It needs a human fix.

**What CI still flags, and why I can't fix it.** Both remaining findings are in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`, not in the code:
- **Typecheck (line 30):** the test passes `baseSystemPrompt` to `new PromptBuilder(...)`, but `PromptBuilderConfig` only has `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`.
- **Lint (line 40):** the test makes 3 `expect` calls, and the repo's rule allows 1.

The fix is small — use `identity: 'You are HAL.'` and combine the three checks into one `toEqual` — but that means editing the acceptance test, which rounds may not do. I added this to `.lore/dod.md` as an open facet.

**What I fixed from the CI report:**
- **spec-names and require-spec-link (12 findings):** last round's new unit test pushed every test below it down 18 lines, so the spec links pointed at the wrong lines. I repointed them with the repo's own `check-spec-anchor-names.mjs --fix`, in `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-tool-input-validation/spec.md`.
- **changelog:** I added an entry under Unreleased → Changed. It says that a throwing `beforeSession` now runs `onError` and `afterSession`, and the caller still gets the same rejection. Its migration note tells consumers that `afterSession` can't tell whether `beforeSession` finished, so they should record what they allocated (for example in a `WeakMap` keyed by the session) and release only that.

**The open question from the ticket.** I decided that `afterSession` should still run after a failed `beforeSession`. I recorded that in `specs/hal-engine-config-hooks/spec.md` as a new section, "A `beforeSession` that throws", and removed the old line from "Measured semantics". The section says what a hook can assume: when `beforeSession` throws, no later hook runs, no provider is called and no tool runs — but nothing passed to `afterSession` says so.

**Tests:** this round's work was docs and link repairs, so I wrote no new test. Last round's two `beforeSession` tests in `chatOrchestrator.test.ts` both pass. Of the red tests, 0 were mine and 0 were regressions; the red checks on the last build were the acceptance test's own errors plus missing docs and stale links.

**Delivery:** committed and pushed to `loop-bench/94`. It was already up to date with `origin/main`, and `git status` shows the branch is not ahead of its upstream.

**Not touched (out of scope):** running prettier on whole spec files rewraps unrelated lines in `hal-engine-architecture/spec.md`, so I only formatted the files I edited and reverted that one.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test itself fails CI: baseSystemPrompt is not a PromptBuilderConfig field (TS2353, line 30) and 3 expects violate re-lint/max-expects (line 40); fixing it means editing the acceptance test"}}