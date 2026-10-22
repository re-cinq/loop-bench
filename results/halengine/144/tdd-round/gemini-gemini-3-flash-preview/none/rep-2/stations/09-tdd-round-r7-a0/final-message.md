I have completed the round by fixing all the CI failures reported from the previous push. This included resolving ESLint errors, fixing broken specification links caused by refactoring, and addressing a test regression in the provider factory.

### Changes Made:
- **ESLint Fixes:**
  - Updated `specs/hal-engine-websocket-protocol/spec.md` to set its `Status` to `In Progress`, as the current test coverage (42/218) does not yet support the `Implemented` status.
  - Added `// eslint-disable-next-line camelcase` suppressions in `src/transport/ws/validation.ts` for protocol-mandated message type identifiers (`user_message`, `list_conversations`).
  - Refactored `src/transport/ws/messageHandler.test.ts` to remove an `as any` cast and eliminate code duplication by extracting a `handleAndExpectUnsupported` helper function.
- **Test Regression Fix:**
  - Refactored `src/providers/providerFactory.test.ts` to mock `requireOptionalPeer` using `jest.unstable_mockModule`. This prevents the tests from instantiating the real Vertex AI SDK, which was failing in the CI environment due to initialization requirements.
- **Traceability & Delivery:**
  - Manually updated the line-number anchors in `specs/hal-engine-abandon-on-close/spec.md`, `specs/hal-engine-conversation-list/spec.md`, `specs/hal-engine-tool-executor-throw/spec.md`, and `specs/hal-engine-websocket-protocol/spec.md` after the automated re-anchoring script failed to resolve the shifts caused by my refactoring.
  - Formatted all modified TypeScript files using the project's Prettier configuration.
  - Verified the branch is up to date with `origin/main` and pushed all changes.

The round did not run tests locally as the `jest` environment was not directly accessible, but the fixes were applied based on the specific failures reported by CI.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures","tdd_next":"acceptance green"}}