Fixed both CI failures by updating three stale line anchors in `specs/hal-engine-tool-input-validation/spec.md`:
- `registry.test.ts#L4` → `#L12` (rejects input missing a required property)
- `registry.test.ts#L22` → `#L30` (passes valid input with extra properties)
- `registry.test.ts#L62` → `#L54` (throws for an unknown tool name)

The tests moved when describe blocks were added around each it-block in a previous round, but the spec citations weren't updated. This fixes both the `spec-names` check (wrong line numbers) and the `eslint` `require-spec-link` rule (which treats a citation pointing to the wrong line as "no spec link" for the test at the correct line).

No regressions introduced; 0 red tests written, 0 regressions caused. No unrelated smells noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reanchor spec citations to current test lines (eslint + spec-names)","tdd_next":"acceptance green"}}