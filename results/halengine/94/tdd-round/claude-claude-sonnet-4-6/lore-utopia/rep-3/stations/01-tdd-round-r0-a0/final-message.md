Branch is clean and not ahead of upstream. Summary:

**Facet closed:** Moved `beforeSession` inside the `try` block in `chatOrchestrator.ts` (line 91 → inside try at line 92). A `beforeSession` throw now reaches `catch` (fires `onError`) and `finally` (fires `afterSession`) exactly as any other orchestration failure.

**Unit test written:** `'calls onError and afterSession when beforeSession throws'` in `chatOrchestrator.test.ts:116` — confirmed RED then GREEN.

**Also fixed:** Stale spec anchor `#L194` → `#L215` in `specs/hal-engine-config-hooks/spec.md` (shifted by my test insertion), plus reanchor updates to `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-tool-input-validation/spec.md`.

**Unrelated smell noticed:** The spec section "Measured semantics — out of scope" header is now incorrect — the first bullet item (the `beforeSession`/try behavior) IS in scope for this ticket. This should be restructured in facet 2.

**0 regressions** — my test is the only new one; all 24 existing tests stayed green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block","tdd_next":"Update specs/hal-engine-config-hooks/spec.md — replace 'Measured semantics — out of scope' framing for the beforeSession guarantee and document CHANGELOG entry"}}