Branch is current. The two unstaged spec files (`hal-engine-architecture/spec.md`, `hal-engine-tool-input-validation/spec.md`) were modified by the `repoint-spec-anchors.mjs` script fixing anchors in other specs — those are unrelated to this ticket and not staged.

**Round summary:**
- Wrote unit test `'calls onError when beforeSession throws'` in `chatOrchestrator.test.ts:116` — confirmed RED
- Fixed `chatOrchestrator.ts`: moved `beforeSession` call inside the `try` block — test turned GREEN
- Updated `specs/hal-engine-config-hooks/spec.md`: moved statement from "Measured semantics — out of scope" into a new "Error handling" section with two statements (one for `onError`, one for `afterSession`), each with its validation link; fixed drifted anchor for "replaces system prompt with returned value" (L194 → L214)
- Added "Fixed" entry to `CHANGELOG.md` with migration note
- Ticked all three facets in `.lore/dod.md`
- 0 regressions introduced; 1 test written (mine)

Unrelated smells noticed but not touched: the two other spec files modified by the anchor script (`hal-engine-architecture/spec.md`, `hal-engine-tool-input-validation/spec.md`) had drifted anchors from prior rounds — the script fixed them in the working tree but they were not staged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block; update spec and CHANGELOG","tdd_next":"acceptance green"}}