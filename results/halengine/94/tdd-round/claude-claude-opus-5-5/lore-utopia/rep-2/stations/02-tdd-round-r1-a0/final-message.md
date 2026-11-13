I fixed the changelog failure and the spec facets and pushed them, but the build still can't go green: the other two failures are inside the acceptance test, and fixing them means editing it, which the rules forbid. No tests ran this round, because the changes are docs only.

**What CI said about the last push:** typecheck, eslint and changelog failed.
- **Changelog (fixed):** `CHANGELOG.md` now has an entry under `[Unreleased] / Changed`. It says that `onError` and then `afterSession` now run when `beforeSession` throws, followed by `SessionStore.save` if the store has one. The caller still gets the same rejection. It also has a migration note: `afterSession` isn't told whether `beforeSession` finished, so a cleanup that runs unconditionally now also runs for a session that was never allocated.
- **Spec (fixed):** in `specs/hal-engine-config-hooks/spec.md`, the `beforeSession` statement was still under "Measured semantics — out of scope", whose intro says this issue changes none of them. It now has its own section, "When `beforeSession` throws", which states:
  - The rejection is unchanged, `onError` gets the same error, and `afterSession` runs.
  - When that happens, nothing else in the turn ran: no other hook, no provider call, no tool, and the session's entries are as passed in.
  - `afterSession` cannot tell a session that never started from one that finished. A deployer has to record the allocation themselves, for example in a `WeakMap` keyed by the session.
  
  The out-of-scope intro now says "two properties". This repo has no `reanchor.mjs`, so I checked the two links by hand: test lines 40 and 284 are still correct.
- **Typecheck (blocked):** line 30 of `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` passes `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`. `PromptBuilderConfig` actually takes `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`.
- **Eslint (blocked):** line 40 of the same file has three `expect`s, and `re-lint/max-expects` allows one.

Both are fixable without changing what the test asserts: build the prompt from `{identity: 'You are HAL.'}`, and combine the three checks into one `toEqual` on an object. Someone has to make that edit to the acceptance test.

**Red tests:** two findings, both in the acceptance test, which nobody wrote this round; no regressions. The behaviour change itself was already on the branch from the previous round.

`.lore/dod.md` now has all four facets ticked and a new unchecked item recording the acceptance-test defects. The commit is pushed, `origin/main` was already merged in, and the branch is level with its upstream.

Unrelated smells I noticed and left alone: the "out-of-scope" bullets point at raw line numbers (`chatOrchestrator.ts#L148`/`#L150`), which will drift as the file changes.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test chatOrchestrator.beforeSession.acceptance.test.ts fails CI typecheck (L30 baseSystemPrompt not in PromptBuilderConfig) and eslint max-expects (L40); fixing requires editing the acceptance test"}}