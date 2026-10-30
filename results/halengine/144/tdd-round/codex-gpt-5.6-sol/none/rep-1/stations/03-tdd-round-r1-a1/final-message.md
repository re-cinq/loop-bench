Implemented and pushed one TDD round:

- Added `list_sessions` validation and sanitization.
- Validated `limit` and composite `before` cursor fields.
- Added one focused test; red first, then green.
- Updated spec traceability and corrected stale anchors.
- Checked off the validation facet in `.lore/dod.md`.
- Merged `origin/main`; branch is fully pushed (`0 ahead, 0 behind`).

Tests: 1 newly red test, 0 regressions; final targeted file passed all 4 tests. Prior lint findings inside the acceptance test remain untouched as required.

Commit: `fd8975c feat(transport): validate conversation list frames`

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames in src/transport/ws/validation.ts","tdd_next":"thread sessionStore into createMessageHandler and wire it in createServer"}}