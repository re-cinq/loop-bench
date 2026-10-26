Branch is pushed and up to date. The changes made:

1. **`beforeSessionError.acceptance.test.ts`**: Collapsed 4 `expect` calls into 1 `toEqual` to satisfy `re-lint/max-expects`.

2. **`specs/hal-engine-config-hooks/spec.md`**: Moved the acceptance-test spec link from mid-sentence to the trailing parenthetical (fixes `check-spec-links`); updated `#L194` → `#L211` for `replaces system prompt with returned value`.

3. **`specs/hal-engine-architecture/spec.md`**: Updated all 20 chatOrchestrator.test.ts line numbers shifted +17 by the previously-inserted test; added a second `validated by` link for `called even when beforeSession throws` at `#L145`.

4. **`specs/hal-engine-tool-input-validation/spec.md`**: Updated `#L523` → `#L540` for the orchestrator integration test.

No regressions introduced (0 regressions). No new unrelated smells noticed worth naming.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures: stale spec-link line numbers, misplaced coverage link, max-expects in acceptance test","tdd_next":"acceptance green"}}