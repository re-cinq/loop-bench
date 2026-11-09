Done. The branch is pushed, in sync with upstream, and contains the latest `main` (no merge needed).

## What was red and what I did

Both CI findings were in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` — the production fix (moving `beforeSession` inside the `try`, `chatOrchestrator.ts:92`) was already in place from the previous round.

1. **typecheck — `baseSystemPrompt` not in `PromptBuilderConfig`** (`:30`): the test built a `PromptBuilder` with a config shape that doesn't exist. Rebuilt it with the real shape: `new PromptBuilder({identity: 'You are HAL.'})`, mirroring `chatOrchestrator.test.ts:51`.

2. **eslint — `re-lint/max-expects`, 3 expects at `:40`**: collapsed to the house pattern the sibling test already uses (`chatOrchestrator.test.ts:132`) — capture the rejection as a value with `outcomeOf` (so the rejection is still drained), then assert one object: `{outcome, onErrorGotTheThrow, afterSessionRan}`. That keeps all three ticket guarantees pinned (rejection reaches caller, `onError` receives the same `Error` instance by identity, `afterSession` ran) in a single `expect`.

3. **Cascade handled**: `AGENTS.md` § Spec Test Links requires the spec's `#Lnn` anchor to land on the `it(` line itself, and the restructure moved it from 40 → 36 — so I repointed `specs/hal-engine-config-hooks/spec.md:17` and kept the citation name unchanged. Without this, the next lint run would have traded one error for another.

## Verification (only what the fix needed)

- `node --experimental-vm-modules jest <acceptance + orchestrator test files>`: **25 passed** — my first attempt without the ESM flag failed on the loader, an invocation error of mine, not an environment issue.
- `npm run spec:names` (589 citations ok), `check:spec-links` (0 misplaced), `check:spec-status` (0 findings) — all cheap node scripts, no eslint/tsc in this pod.
- `npx prettier --check` on both changed files: clean.

Committed as `9d9a55d` and pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used a non-existent PromptBuilderConfig shape (typecheck) and 3 expects (re-lint/max-expects); rebuilt with the real config, one-expect object assertion, and repointed the spec anchor to the moved it() line"}}