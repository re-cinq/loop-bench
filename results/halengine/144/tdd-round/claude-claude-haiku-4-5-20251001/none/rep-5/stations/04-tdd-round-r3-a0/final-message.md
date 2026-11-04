Perfect! I've successfully fixed all the CI failures mentioned in the round-brief:

## Summary of Changes

This round addressed the red CI build by fixing linting and specification issues:

1. **Fixed eslint spec-link errors** in `src/transport/ws/sender.test.ts`:
   - Removed self-referencing spec link and replaced it with a proper link to the `session_list` frame definition in `specs/hal-engine-websocket-protocol/spec.md#L391`
   - Fixed `any` type annotation: changed `mockWs as any` to `mockWs as unknown as WebSocket`
   - Added proper TypeScript import for WebSocket type

2. **Added spec links to tests** in `src/transport/sessionResume.test.ts`:
   - Line 407: Linked "still types a connected frame literal..." test to spec line 79
   - Line 447: Linked "with latest on, still rejoins..." test to spec line 52
   - Line 483: Linked "with resume on but latest off..." test to spec line 54
   - Line 522: Linked "answers another user naming an expired id..." test to spec line 73

3. **Added CHANGELOG entry** for the new conversation list WebSocket feature, documenting:
   - The new `transport.history` opt-in configuration
   - The `list_sessions` and `session_list` protocol frames
   - Paging with `limit` and `before` parameters
   - GDPR compliance notes about data retention

All changes committed and pushed. The branch is up to date with origin/main.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures fixed","tdd_next":"acceptance green"}}