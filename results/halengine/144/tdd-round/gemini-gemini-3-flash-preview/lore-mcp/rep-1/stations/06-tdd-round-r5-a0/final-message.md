I have completed the TDD round for ticket #144, "Deliver a user's conversation list over the WebSocket protocol."

This round focused on resolving the CI failures (ESLint errors) identified in the previous round and ensuring all documentation facets were correctly finalized.

### Changes Made:
- **ESLint Fixes:**
  - `src/transport/ws/validation.ts`: Quoted protocol message type keys and extracted the `limit` validation logic into a named predicate to satisfy `camelcase` and `max-boolean-operators` rules.
  - `src/transport/ws/listSessions.test.ts`: Reduced member chain depth in mock expectations to satisfy the `max-member-chain` rule.
  - `example/full-config.ts`: Moved long trailing comments to the line above to satisfy the `max-comment-lines` rule.
- **Documentation & Specs:**
  - Fixed formatting in `docs/getting-started.md` by removing erroneous blank lines between doc-block markers and code fences, which was breaking the `docs:fix` script.
  - Regenerated `docs/getting-started.md` using `npm run docs:fix` to ensure the "Full Configuration" section reflects the latest implementation.
  - Updated `specs/hal-engine-websocket-protocol/spec.md` status to `Implemented`.
  - Ran `scripts/repoint-spec-anchors.mjs` to ensure all spec citations point to the correct line numbers.
- **Verification:**
  - Confirmed that `src/transport/ws/listSessions.test.ts` passes under ESM.
  - The facets in `.lore/dod.md` are now truthfully complete and the build is ready for CI validation.

I have committed and pushed these changes to the `loop-bench/144` branch and ensured it is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ESLint compliance and documentation fix","tdd_next":"acceptance green"}}