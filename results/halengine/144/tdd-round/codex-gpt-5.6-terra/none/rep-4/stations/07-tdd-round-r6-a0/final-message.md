Implemented and pushed `2eca8d0`.

- Added a red/green validator test for nested cursor-field stripping.
- Fixed the TypeScript narrowing issue for `limit`.
- Repaired spec traceability anchors.
- Ran only `conversationListValidation.test.ts`: 5 passing.
- CI previously reported 1 non-authored regression suite (`optionalPeers`); its actionable failure detail was truncated in the brief.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sanitize unrecognised fields from accepted list_sessions cursors and repair their traceability anchors","tdd_next":"acceptance green"}}