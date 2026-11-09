The base is current — no drift, and the branch is level with its upstream. The round is complete.

## Round summary

**Facet closed:** the behaviour facet — `beforeSession` moved inside the `try` in `src/orchestration/chatOrchestrator.ts:92`, so a throw from it reaches the same `catch` and `finally` as any other turn failure: `onError` gets the error with the usual `(session, error)` shape, `afterSession` runs, the session saves, and the rejection still reaches the caller unchanged. One why-comment guards the placement against being hoisted back out.

**Also closed this round** (the two doc facets that record the same change):
- `specs/hal-engine-config-hooks/spec.md` — the RED round had replaced the flaw bullet but left the section framing claiming all three recorded properties were out of scope and "owned by no issue", which this change makes false; the section now reads as recorded semantics with bullet 1 owned by #94, and the bullet states the explicit decision the ticket asked for: `afterSession` runs by design for a `beforeSession` that never completed, and a hook that must not double-release marks the allocation itself. Repointed the two `chatOrchestrator.ts#Lnn` anchors my comment shifted (L148→L149, L150→L151; no `reanchor`/repoint run was possible for this spec — its anchor set already differs from main, so hand-verified against the working file).
- `CHANGELOG.md` — a `Changed` entry with a migration note telling an existing consumer that `afterSession` now also fires for a never-started turn and that `onError` may now see `beforeSession`'s own failures.

**Tests:** no test ran in this pod. The driving test is the acceptance test `.lore/dod.md` lists, which this round must not run by name — it was committed red by the previous round and CI is the judge of my push. I traced each of its four assertions by hand against the new control flow (including that `commitStreamingEntries` is a no-op on the test's user-only session, so the newly-reached `finally` cannot throw). 0 red tests are mine, 0 regressions; the tests pinning non-throwing `beforeSession` behaviour are unedited, and the move preserves the call order they pin.

**Out-of-scope smells noticed, not fixed:** the `instanceof Error` gate on `onError` at `src/orchestration/chatOrchestrator.ts:151` (its own issue, per the ticket); `afterModelResponse` receiving per-round `lastUsage` rather than a sum at `src/orchestration/chatOrchestrator.ts:149` (HALEngine#93 territory); and, as documented intent rather than a defect, a configured store now persists a session whose turn never started.

Committed as `44eb878`, pushed, and merged with `origin/main` (already up to date); `git status` reports the branch level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"beforeSession moved inside the try so a throw from it fires onError and afterSession; spec and CHANGELOG record the guarantee","tdd_next":"acceptance green"}}