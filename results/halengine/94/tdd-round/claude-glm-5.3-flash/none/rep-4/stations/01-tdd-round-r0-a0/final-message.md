Round complete. Pushed as `d716d92` on `loop-bench/94`, up to date with its upstream, merged clean against `origin/main`.

**What this round did** (green phase — the red test landed last round in `962a4fc`):

- **Code**: moved the `beforeSession` call inside the `try` in `src/orchestration/chatOrchestrator.ts:93`, so a throw from it reaches the same `catch` (→ `onError`, then rethrow to the caller) and `finally` (`commitStreamingEntries` → `afterSession` → `saveSession`) as any other turn failure. No other caller of the hook exists; the non-throwing path is byte-for-byte the same sequence as before.
- **Spec**: `specs/hal-engine-config-hooks/spec.md` — the guarantee now lives in a new `## Failure path` section instead of "Measured semantics — out of scope", whose intro ("This issue changes none of them") my change would have made false; it now covers the remaining two. The same cited statement records the ticket's explicit question: `afterSession` gets no signal that the turn never started, so a release written against a `beforeSession` allocation must tolerate the allocation never happening. Re-anchored by hand the two `#Lnn` source links my edit shifted (`#L150`→`#L151`, `#L148`→`#L149`) — there is no `scripts/spec-links/reanchor.mjs` here, and `spec:names` only repoints test-file citations.
- **CHANGELOG**: `### Fixed` entry under Unreleased stating what changes for an existing consumer, with a migration note.
- **`.lore/dod.md`**: all three facets ticked; the acceptance box stays for CI.

**Tests**: this round ran no tests here. The only test that pins the closed facet is the acceptance test `.lore/dod.md` lists, and the pod's guard correctly refused it (it's CI's to run) — so the green bar is unverified locally and CI's verdict on the push is the judge. Red tests mine: 0 written this round. Regressions: 0 known — no round brief exists and no `lore_get_ci_failures` tool is available in this pod, so I have no CI verdict to read. Prettier was run over the changed files and passes; no lint, typecheck, or build was run, per pod limits.

**Unfixed smells noticed, acted on none**: the `instanceof Error` gate on `onError` and the per-round (non-summed) `lastUsage` passed to `afterModelResponse` remain recorded in the spec as out-of-scope, each already owned elsewhere.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"run onError and afterSession when beforeSession throws — beforeSession moved inside the try, spec and CHANGELOG updated","tdd_next":"acceptance green"}}