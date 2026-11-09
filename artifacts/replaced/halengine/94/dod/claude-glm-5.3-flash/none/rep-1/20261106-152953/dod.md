# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it
> escapes before the `catch` and `finally` exist. Neither `onError` nor
> `afterSession` runs.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator(provider, promptBuilder, …, {hooks})`
with a real entry point (`processMessage`) that the acceptance tests call today, so each test fails on the
missing behaviour, not on a missing module. Both tests are red on the committed branch: `onError` sees
`receivedError: undefined`, and the order recorded is `['beforeSession']` with neither cleanup hook firing.

## Done when these pass

- [ ] **hands the thrown Error to onError with the session, and the same rejection still reaches the caller** —
      criteria 1 and 2 together: the throw escapes to the caller unchanged (same `Error` instance), and `onError`
      receives that same error plus the session, the argument shape any other orchestrator failure gets.
      `src/orchestration/beforeSessionError.acceptance.test.ts`
- [ ] **runs onError then afterSession, the same order as any other failed turn** — criterion 3: the cleanup
      runs, in the documented error-path order, so a resource allocated in `beforeSession` is released.
      `src/orchestration/beforeSessionError.acceptance.test.ts`

Criterion 4 (a non-throwing `beforeSession` behaves exactly as today) is pinned by existing tests that stay
unedited and green: `calls all hooks in correct order` and `error path calls onError then afterSession`
(`src/orchestration/chatOrchestrator.test.ts`), and `fires the lifecycle hooks in documented order for a
session that completes without error` (`src/config.test.ts`). All three pass on the committed branch.

## Facets

- [ ] In `src/orchestration/chatOrchestrator.ts`, move the `beforeSession` call inside the `try`. Nothing else
      about the path changes: the same `catch` re-raises after `onError`, and the `finally` already runs
      `commitStreamingEntries`, `afterSession` and the session save. The tests above turn green on that move alone.
- [ ] Decide and record the question the ticket raises: what may an `afterSession` hook assume after a
      `beforeSession` that threw. The tests pin that it _does_ run; the spec must state how much of the turn
      happened — no provider call was made and the session entries are still as the caller supplied them, so a
      hook sees "never started", not a partially-written turn.
- [ ] In `specs/hal-engine-config-hooks/spec.md`, replace the first bullet under "Measured semantics — out of
      scope" (the recorded-flaw line citing `chatOrchestrator.ts#L91`) with the new guarantee, in the repo's
      citation form, e.g. under a renamed section since the flaw is now fixed: "`onError` and `afterSession` fire
      for a `beforeSession` that throws, in the same order as any other failed turn, and the caller still receives
      the thrown error ([validated by: hands the thrown Error to onError with the session, and the same rejection
      still reaches the caller](../../src/orchestration/beforeSessionError.acceptance.test.ts#L38))", plus the
      "how much of the turn happened" statement cited to the second test (`…#L63`). The `#Lnn` numbers are as of
      this commit; run `npm run spec:names:fix` if the file shifts while editing.
- [ ] `CHANGELOG.md` entry saying what changes for an existing consumer: an `afterSession` hook (and the
      session save) now also runs when `beforeSession` throws, and `onError` now sees that failure — cleanup code
      written against the old silent path runs on a session whose turn never started.

## Out of scope

- The `instanceof Error` gate on `onError` — a thrown string or object still bypasses `onError`; its own issue.
- Usage accounting across tool rounds (`lastUsage` is the last round only) — HALEngine#93.
- Changing what `beforeSession` throwing means for the session save ordering, or any retry of a failed
  `beforeSession`: this ticket only routes the throw through the existing `catch`/`finally`.

## Validation

Run with `npm test -- src/orchestration/beforeSessionError.acceptance.test.ts`: 2 failed, 2 total. Test 1
fails on `receivedError: undefined, sameSession: false` while `outcome` already matches — the rejection path
is fine, `onError` is not. Test 2 fails on `callOrder: ['beforeSession']` against the expected
`['beforeSession', 'onError', 'afterSession']` — the cleanup never runs. Both are exactly the quoted claim.
The unedited existing pins above were run and pass (2 + 1 tests).