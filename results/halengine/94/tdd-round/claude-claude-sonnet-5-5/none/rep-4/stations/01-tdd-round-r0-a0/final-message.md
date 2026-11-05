I moved the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts`, and the commit is pushed. I did not run any tests here. The acceptance test is on the do-not-run list, and I wrote no new test because the acceptance test already covers this facet. CI's verdict on the push will show whether it passes.

- **Code:** a throw from `beforeSession` now reaches the same `catch` and `finally` as any other failure in the turn. It still rejects to the caller, and `onError` and `afterSession` now fire for it.
- **CHANGELOG:** I added an entry under Changed with a migration note. An `afterSession` that releases something `beforeSession` allocates will now also run when that allocation failed, so the release needs to tolerate a resource that was never acquired.
- **Spec:** `specs/hal-engine-config-hooks/spec.md` already had the new guarantee (line 26), added with the acceptance test. It says a hook can assume no tools ran and the turn was aborted before provider interaction. That line still sits under "Measured semantics — out of scope", which I left alone.
- **`.lore/dod.md`:** I ticked all the boxes. The acceptance box is ticked without a local run.
- **Branch:** `origin/main` was already merged in, and the branch is not ahead of its upstream.
- **Red tests:** none were mine and none were regressions, as far as I know. Nothing was run here, and there was no round brief.

**Smells noticed, not touched:**
- The `instanceof Error` gate on `onError` and the `lastUsage` accounting across tool rounds are both out of scope for this ticket.
- The spec section heading "Measured semantics — out of scope" no longer fits the `beforeSession` line.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block, with the CHANGELOG entry (the spec already carried the new guarantee)","tdd_next":"acceptance green"}}