I have completed the red-green-refactor round by addressing the CI failures reported in the brief.

### Changes:
- **Lint Fixes:**
  - In `src/transport/ws/validation.ts`, I added `// eslint-disable-next-line camelcase` to the `validators` object to allow snake_case keys which are required by the WebSocket protocol.
  - In `example/full-config.ts`, I shortened the comment on line 89 to prevent it from spanning multiple lines after formatting, satisfying the `re-lint/max-comment-lines` rule.
- **Test Fix:**
  - In `src/providers/providerFactory.test.ts`, I introduced a mock for `@google-cloud/vertexai`. The previous test failure was caused by the `VertexAI` constructor failing in the CI environment (possibly due to missing credentials or its scheduled removal in mid-2026). Mocking it allows the factory's dispatch logic to be tested without side effects.
- **Traceability:**
  - Ran `scripts/repoint-spec-anchors.mjs` to synchronize spec links. Some links in `specs/hal-engine-npm-release/spec.md` and `specs/hal-engine-providers/spec.md` were updated to reflect line shifts in `src/providers/providerFactory.test.ts`.
- **Formatting:**
  - Applied `prettier --write` to all modified files.

The Definition of Done indicates that all implementation facets are already complete. My fixes bring the build back to a state where the acceptance tests (run by CI) can be judged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fixed CI findings and synchronized spec links","tdd_next":"acceptance green"}}