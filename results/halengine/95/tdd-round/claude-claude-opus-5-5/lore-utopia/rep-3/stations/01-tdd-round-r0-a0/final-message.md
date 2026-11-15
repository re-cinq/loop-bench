This round fixed the bug: `onError` now fires for a rejection that is not an `Error`. It's committed and pushed to `loop-bench/95`, which was already up to date with `origin/main`, and `git status` shows nothing unpushed. I ran only my own test file; CI will judge the acceptance tests.

- **Red:** I added `wraps a non-Error rejection in an Error whose cause is the original value` in `src/orchestration/chatOrchestrator.test.ts:311`. A provider rejects with `{code: 503, detail: 'upstream down'}`. The test checks that `onError` is called once with an `Error` whose `cause` is that object, and that the caller still gets the original object. It failed as expected: `onError` was never called.
- **Green:** In `src/orchestration/chatOrchestrator.ts`, the `catch` no longer checks `instanceof Error` before calling `onError`; it calls `onError(session, asError(error))`. `asError` passes an `Error` through as the same instance. Anything else becomes `new Error(message, {cause: value})`, where the message is the string itself, or the value as JSON, or `String(value)` as a last resort. The value thrown to the caller is unchanged. All 27 tests in the file pass, including the three existing `Error` tests, which I didn't edit. That closes the dod's second facet too.
- **Refactor:** `createErrorProvider` in the test file now takes `unknown`, so my test reuses it instead of repeating it.
- **Traceability:**
  - I added a sentence about `cause`, with a link to the new test, to the `onError` statement in `specs/hal-engine-config-hooks/spec.md`. That statement already described the new guarantee.
  - The new test moved later tests down 18 lines. The repo has no `reanchor.mjs`, so I re-pointed all 15 affected links by test title, across three specs.
  - There is no convention here for stamping a spec anchor on a test, so none was added.
  - The spec's Status row already reads Shipped.
- **Red tests:** one was mine and there were no regressions; there was no CI verdict on an earlier push yet.

**Next facets (added to `.lore/dod.md`):**
- The `CHANGELOG.md` entry.
- `JSON.stringify` throws on a circular object or a `BigInt`. If that happens inside the `catch`, the error it throws would reach the caller instead of the original rejection. It needs a fallback to `String(value)`, pinned by a test.
- A rejection with `undefined`, which the ticket requires and nothing tests yet.

**Not acted on:** `specs/hal-engine-architecture/spec.md` already failed `prettier --check` before this change. The coverage graph reports no tests covering `chatOrchestrator.ts` lines 149–153, though `chatOrchestrator.test.ts` plainly runs that code.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce a non-Error rejection to an Error (cause preserved) so onError always fires; existing Error tests stay green","tdd_next":"CHANGELOG entry under [Unreleased]; then guard asError against a JSON.stringify throw and pin the undefined rejection"}}