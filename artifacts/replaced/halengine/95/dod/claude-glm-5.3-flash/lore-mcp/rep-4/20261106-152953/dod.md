# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes an `onError` hook and any `AIProvider`, so the acceptance test injects a provider whose stream rejects with a non-`Error` value and calls the real entry point today. The red failures are exactly the ticket's claim: `onErrorCalls: 0` while the caller still receives the rejection.

## Done when these pass

- [ ] **calls onError with an Error whose cause is the string and still rejects the caller with that string** — a provider rejecting with a string calls `onError` once, with an `Error` whose `cause` is that string, and the caller still rejects with the string, not the wrapper
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError with an Error whose cause is the plain object and still rejects the caller with that object** — same guarantee for a plain-object rejection, with `cause` and the caller's rejection holding the original object itself
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError with an Error whose cause is undefined and still rejects the caller with undefined** — `onError` runs even for a rejection with `undefined`, and the caller still rejects with `undefined`
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands onError and the caller the same Error instance the provider rejected with, not a wrapper** — an `AIError` rejection reaches `onError` as the same instance, not a wrapper; this one is green already by design (it pins the facet the fix must not break, acceptance criterion 3's "same instance, not a wrapper")
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

Run them, and nothing else:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

A bare `npx jest --runTestsByPath …` fails to load the ESM suite — the repo's `npm test` carries the `--experimental-vm-modules` flag, so pass it as above or run `npm test` for the whole suite.

## Facets

- [x] Acceptance tests written and red: three fail on `onErrorCalls: 0` (the gate), one green regression pin
- [x] `specs/hal-engine-config-hooks/spec.md`: the recorded-flaw line replaced by four cited guarantee statements; history moved to a Rationale section (Status row untouched — it stays Shipped: all 12 statements cite tests)
- [ ] `src/orchestration/chatOrchestrator.ts`: drop the `error instanceof Error` gate; hand non-`Error` rejections to `onError` wrapped in an `Error` that carries the original as its `cause` (see `src/orchestration/tools/registry.ts:56` for the house idiom), and re-throw the original value unchanged so the caller boundary keeps today's shape
- [ ] The existing suites stay green and unedited (`chatOrchestrator.test.ts`, `sessionSave.test.ts`, `toolBudget.test.ts`, `config.test.ts`) — they pin the `Error`-instance path the fix must preserve
- [ ] `CHANGELOG.md`: a `### Fixed` entry under `[Unreleased]` saying what changes for an existing consumer — `onError` now fires for rejections that are not `Error`s, so a hook that counted errors will see more of them, and each arrives as an `Error` whose `cause` holds the raw value

## Out of scope

- `beforeSession` escaping the `try` (its own issue) — a throw from `beforeSession` already runs `onError` today, so the acceptance tests need not cover it
- Usage accounting across tool rounds (HALEngine#93)
- `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`), `npm run prettier:check` — CI runs these on every push; this pod ran only the acceptance test file