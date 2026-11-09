# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`. A rejection that is not an `Error` — a
> thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely
> while still propagating to the caller.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` takes an injectable provider, and the
existing suite already drives the error path through `processMessage`. The new tests call that real entry point with
a provider whose `sendMessage` throws a raw non-Error value and observe what `onError` received and what the caller's
promise rejected with. No doubles, no new module.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the thrown string, and the caller still receives that string** —
      ticket acceptance criterion 1, verbatim
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **does the same for a rejection with a plain object** — criterion 2, first half
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **does the same for a rejection with undefined** — criterion 2, second half
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [ ] **hands a rejection that is already an Error to onError as that same instance, not a wrapper** — criterion 3.
      This one is GREEN today by design: it is the no-regression half of the ticket. The existing tests pin only the
      error's `message`, so a message-preserving wrapper would slip past them; this test pins instance identity, and
      it must stay green through the fix
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

Run: `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`

Red as of the commit below: the three non-Error tests fail with `callCount: 0` / `isError: false` while
`callerRejected: true` — exactly the reported claim (onError bypassed, rejection still propagating).

## Facets

- [ ] In the `catch` in `src/orchestration/chatOrchestrator.ts` (the `error instanceof Error` gate): call `onError`
      for every rejection. Wrap a non-Error in an `Error` with the original as `cause`; hand an `Error` through as
      the same instance. The `throw error` at the caller boundary stays untouched — the re-thrown value keeps its
      shape today
- [ ] `specs/hal-engine-config-hooks/spec.md` replaces its recorded-flaw line (the `- The catch gates onError on
    error instanceof Error ...` bullet under "Measured semantics — out of scope") with the new guarantee, and
      cites each acceptance test in the established form
      `([validated by: <full test name>](../../src/orchestration/chatOrchestrator.acceptance.test.ts#Lnn))` with
      `#Lnn` on the `it(` line. Until that citation lands, `re-lint/require-spec-link` (an error in
      `eslint.config.mjs`, run by CI) reports these tests as uncited — an expected red closed by this facet. Then
      run `node scripts/repoint-spec-anchors.mjs` to settle the line numbers (this repo has no
      `scripts/spec-links/reanchor.mjs`)
- [ ] `CHANGELOG.md` gains a `### Fixed` bullet under `[Unreleased]` saying what changes for an existing consumer
      whose provider rejects with a non-Error: `onError` now fires where it silently did not, and the hook receives
      a wrapper carrying the original as `cause` — the rejection the caller sees is unchanged
- [ ] `npm run build`, `npm test`, `npm run typecheck`, `npm run eslint` (`--max-warnings 0`) and
      `npm run prettier:check` all pass (criterion 5). CI's Verify job runs these on every push

## Out of scope

- `beforeSession` escaping the `try` (its own issue, per the ticket's tech notes)
- Usage accounting across tool rounds (HALEngine#93)
- The shape of the value re-thrown to the caller: it stays exactly what the provider rejected with
- Any edit to the existing `src/orchestration/chatOrchestrator.test.ts` — criterion 3 pins it unedited