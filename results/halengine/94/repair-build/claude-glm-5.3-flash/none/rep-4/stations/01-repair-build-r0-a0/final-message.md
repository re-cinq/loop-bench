Done. The branch is in sync with `origin/loop-bench/94` and 0 commits behind `origin/main` (no merge needed).

## What was red and what I fixed

CI judged `c3cd08a` (HEAD hadn't moved), and both findings were in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` — the orchestrator fix itself (moving `beforeSession` inside the `try`) was already in and its suite was green.

**typecheck — `TS2353` at line 30:** the test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on `PromptBuilderConfig` (whose real shape is `identity` plus optional `domainContext`/`responseGuidelines`/`toolPreamble`). Replaced with `new PromptBuilder({identity: 'You are HAL.'})`, the idiom `chatOrchestrator.test.ts:51` already uses. Prompt content is irrelevant here — `beforeSession` throws before any prompt is built.

**eslint — `re-lint/max-expects` at 40:3:** three `expect` calls where the rule allows one. Consolidated into a single `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`. The rejection is captured by awaiting in a `try` rather than `expect().rejects`, so the ticket's first criterion — the throw still reaches the caller as a rejection — is still pinned, alongside `onError` receiving the same error instance and `afterSession` having run.

**Follow-on spec repair:** those edits moved the `it(` from line 40 to 32, and `specs/hal-engine-config-hooks/spec.md:17` cites this test at `#L40` — an anchor that must land on the declaration per AGENTS.md. Repointed it to `#L32` (word-diff confirms nothing else in the line changed).

## Verification

- `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` — 1 suite, 1 test, passed.
- `node scripts/check-spec-anchor-names.mjs` — 589 citations name the test they point at.
- `node scripts/check-spec-links.mjs` — 0 misplaced across 1638 statements.
- `npx prettier --check` on the changed test file — compliant.
- No lint or typecheck run locally, per pod constraints: both findings were line-specific fixes taken straight from CI's annotations, and CI re-runs them on the push.

Existing tests elsewhere are untouched, so the non-throwing behaviour stays pinned exactly as it was.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test built PromptBuilder with nonexistent fields (TS2353) and had 3 expects vs max 1; now uses the real config shape and one object assertion, spec anchor repointed to the moved it()"}}