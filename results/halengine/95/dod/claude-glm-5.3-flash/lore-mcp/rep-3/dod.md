# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `hooks.onError` and `processMessage` on `createChatOrchestrator` are the real entry points, and a provider fixture that rejects with a non-`Error` value drives them today. The tests fail on behaviour (the hook never fires), not on a missing path. Run them with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.acceptance.test.ts`.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the thrown string, and rejects the caller with the string itself** — a provider rejecting with a string fires `onError` exactly once, with an `Error` whose `cause` is that string; the caller is still rejected with the raw string. Red today: `onErrorCallCount: 0`.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **calls onError with a wrapping Error for a plain-object rejection and for an undefined rejection** — the same wrapping holds for a plain object and for `undefined`, and the caller boundary is unchanged in both. Red today: `onErrorCallCount: 0` for both.
  `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] In the `catch` at `src/orchestration/chatOrchestrator.ts:150`, call `onError` for every rejection: wrap whatever is not already an `Error` in one that carries the original as `cause`, leave the re-throw exactly as it is. Red → green.
- [ ] Existing `src/orchestration/chatOrchestrator.test.ts` stays unedited and green — the ticket pins Error-passthrough ("same instance, not a wrapper") on those existing tests, so no new test is owed; the spec's third statement under "Error reporting" cites `called with session and error when stream fails`, and CI's full `npm run test:coverage` proves the bar.
- [ ] Add the `CHANGELOG.md` (Unreleased / Fixed) entry saying what changes for an existing consumer — acceptance criterion 4; `scripts/check-changelog.sh` fails CI once non-test `src/` changes land without it. The spec half of criterion 4 is already done in this commit.
- This repo's traceability mechanism is the spec-side citation (`([validated by: <test name>](path#Lnn))`, AGENTS.md § Spec Test Links), not a `spec` field in `tests.list` — `scripts/lore-list-tests.mjs` emits only `{id, name, file}`. The two new statements under "Error reporting" in `specs/hal-engine-config-hooks/spec.md` are the VALIDATED_BY links.

## Out of scope

- `beforeSession` escaping the `try` (its own issue).
- Usage accounting across tool rounds (HALEngine#93).
- Typecheck, eslint and the full suite are CI's to run (this pod OOMs on them); a red build naming a file and line comes back from the "Type check" / "Lint (--max-warnings 0)" / "Test (with coverage floor)" jobs in `.github/workflows/ci.yml`.