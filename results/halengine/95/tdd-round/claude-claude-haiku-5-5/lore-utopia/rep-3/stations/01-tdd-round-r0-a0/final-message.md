Round complete for facet 1: a string rejection now reaches `onError` as an `Error` whose `cause` is the original string, and the caller still gets the unchanged rejection. The change is pushed to `loop-bench/95`, which is in sync with its upstream.

**What I did**
- Red: wrote `src/orchestration/onErrorCoercion.test.ts`, which failed because `onError` was never called on a string rejection.
- Green: in `src/orchestration/chatOrchestrator.ts`, the `catch` now always calls `onError` with `toError(error)`. The helper returns an `Error` unchanged and wraps anything else as `new Error(String(reason), {cause: reason})`. The `instanceof Error` gate is gone.
- Refactor: nothing needed. Prettier reported the touched files unchanged.
- `.lore/dod.md`: I narrowed facet 1 to the string case and ticked it. I appended a new open facet for plain-object and `undefined` rejections. `String(reason)` gives `[object Object]` for an object, so that facet still needs a serialised message.
- `origin/main` was already merged into the branch, so there was nothing new to merge.

**Test runs**
- The only test I ran was the new file, `src/orchestration/onErrorCoercion.test.ts`: red before the change, then 1 passed. Both acceptance files were left alone and not run. The existing `chatOrchestrator.test.ts` was not run either, so I haven't confirmed the existing `Error`-path tests still pass. That is facet 2.
- Typecheck, lint, and build were not run here, per the pod rules. Lint runs in CI.
- There was no round brief, so no CI verdict was in hand. Regressions are unknown until CI reports on this push.
- Traceability: no spec statement was validated by this round's test, so no spec link was added and the spec status is unchanged. The `specs/hal-engine-config-hooks/spec.md` update belongs to a later facet.

**Mistake**
- The commit message is missing the required `Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>` trailer. The branch was already pushed, so I did not amend or force-push it. A follow-up commit can add the trailer if you want it fixed.

**Not touched** (smells I noticed, not acted on)
- The `onErrorCoercion.test.ts` name is a guess. The acceptance file in the same folder already covers this behaviour; the two overlap on purpose for this round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"string rejection reaches onError as an Error whose cause is the string","tdd_next":"plain-object and undefined rejections get a readable message"}}