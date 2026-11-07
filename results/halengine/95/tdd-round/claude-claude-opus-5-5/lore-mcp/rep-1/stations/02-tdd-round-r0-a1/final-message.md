This round closed one facet: wrapping a rejection that isn't an `Error` can no longer throw. The fix is committed and pushed to `loop-bench/95`, which is already up to date with `origin/main` and not ahead of its upstream.

- **Red:** I added `wraps a circular-object rejection without throwing, and rethrows the original object` at `src/orchestration/chatOrchestrator.test.ts:342`. It failed because `JSON.stringify` threw inside `asError`. As a result `onError` never got an `Error`, and the caller got a `TypeError` instead of the object that was originally thrown.
- **Green:** In `src/orchestration/chatOrchestrator.ts`, `asError` now gets its message from a new `describeThrown`. That function catches the serialisation failure and uses a fixed message instead. All 28 tests in that file pass. I ran only that file; I did not run the acceptance tests.
- **Refactor:** none needed. Prettier left the code files unchanged.
- **Traceability:** I added a link to the new test on the `onError` statement in `specs/hal-engine-config-hooks/spec.md` and noted the fixed-message fallback there. The inserted test shifted line numbers, so `scripts/repoint-spec-anchors.mjs` moved 15 existing `#L` links. `check-spec-links` reports nothing stale or unresolved. This repo has no way to stamp a spec anchor on a test, so I didn't add one.
- **dod.md:** I ticked the `asError` facet.

**Red tests:** one, and it was mine. There was no round brief, so I have no CI verdict on the last push and found no regressions to count.

**Smell noticed, not acted on:** running `npx jest` directly fails with an ESM error. You have to use `node --experimental-vm-modules`, as the `npm test` script does.

**Next round:** the `CHANGELOG.md` entry under `[Unreleased]` → `Fixed`, saying `onError` now also fires for rejections that aren't an `Error`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"asError must never throw (circular object / BigInt falls back to a fixed message)","tdd_next":"Add a CHANGELOG.md entry under [Unreleased] describing the behaviour change for existing consumers"}}