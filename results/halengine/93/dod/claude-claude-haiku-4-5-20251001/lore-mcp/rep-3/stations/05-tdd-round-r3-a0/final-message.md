The push landed. Both CI failures are fixed:

1. **eslint `re-lint/require-spec-link`**: The test at line 76 lacked a matching spec citation because the spec pointed to `#L73`. Updating to `#L76` restores the link the linter looks for.
2. **spec-names**: Three `validated by` anchors in `specs/hal-engine-config-hooks/spec.md` pointed to stale line numbers (`#L39`, `#L54`, `#L73`); corrected to `#L45`, `#L57`, `#L76` to match where the tests actually sit after prior insertions.

No regressions written — 0 tests were mine this round and 0 were regressions; this was a pure spec-anchor fix with no test file changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix stale spec-link anchors (eslint + spec-names CI failures)","tdd_next":"acceptance green"}}