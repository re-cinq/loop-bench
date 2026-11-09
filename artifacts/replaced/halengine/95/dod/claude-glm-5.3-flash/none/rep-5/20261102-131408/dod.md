# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes any `AIProvider`, so a provider whose `sendMessage` rejects with a string, a plain object or `undefined` drives the real `processMessage` entry point, and the test observes both `onError` and the caller's rejection. No doubles beyond the provider itself, which is the layer the orchestrator is built to sit on.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the thrown string, and still rejects the caller with that string** — the first acceptance criterion: wrapped error with the original as `cause`, exactly one call, and the caller catches the same string
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **wraps a rejection with a plain object the same way, preserving it as the cause for onError** — the second shape of a non-`Error` rejection
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **wraps a rejection with undefined the same way, and still rejects the caller with undefined** — the third shape; `cause` is `undefined` and the caller still sees `undefined`
      `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **existing `onError` tests stay green and unedited** — the already-an-`Error` case reaching `onError` as the same instance is pinned by these, not by a new test: `called with session and error when stream fails`, `error still propagates after onError hook`, `runs onError then afterSession when it throws, and still rejects to the caller` in `src/orchestration/chatOrchestrator.test.ts`

Run them with:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.onError.acceptance.test.ts
```

## Facets

- [x] Replace the spec's recorded-flaw section with the new guarantee, cited to the three tests — done by the dod pod (`specs/hal-engine-config-hooks/spec.md`, section "Rejections that are not Errors")
- [ ] In `src/orchestration/chatOrchestrator.ts`, drop the `error instanceof Error` gate in the `catch`: whatever is not already an `Error` is wrapped in one preserving the original as `cause`; the re-thrown value stays exactly what it is today
- [ ] A rejection that is already an `Error` reaches `onError` unwrapped — no new test for this; the three existing tests named above must still pass without edits
- [ ] `CHANGELOG.md` gains an `[Unreleased]` entry saying what changes for an existing consumer (required by CI anyway: the code change touches non-test files under `src/`)
- [ ] CI's `verify` job green: `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), `npm run prettier:check`

## Out of scope

- `beforeSession` escaping the `try` — its own issue; the hook already sits inside the same `try`/`finally` as the rest of the turn
- Usage accounting across tool rounds (HALEngine#93)
- The wrapped error's `message` wording — the criteria pin the type and the `cause`, not the text