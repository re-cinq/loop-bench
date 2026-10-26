All three CI failures are fixed and pushed:

1. **`specs/hal-engine-architecture/spec.md:359`** — Split the single multi-link bullet into 4 separate bullets, each with its test link in its own trailing parenthetical. This satisfies both `spec-links` (no misplaced coverage links) and `require-spec-link` (each `orchestratorHelpers.test.ts` test now has a reachable spec link).

2. **`src/orchestration/chatOrchestrator.acceptance.test.ts:11`** — Moved `createSession` below `runAndCapture` to satisfy the `callee-below-caller` rule. The `describe` block stays at line 33, so the spec link anchors (#L34, #L53, #L66, #L86) in `hal-engine-config-hooks/spec.md` remain valid.

3. **`specs/hal-engine-config-hooks/spec.md`** — Changed status from `Shipped` to `In Progress` (11 of 13 testable statements are linked; the two pre-existing unlinked statements — the "These properties..." intro paragraph under "Measured semantics" and the "`catch` gates `onError`..." statement — have no tests to link to and are not part of this ticket's scope).

No regressions: the 8 unit tests in `orchestratorHelpers.test.ts` all pass.

Unrelated smells noticed but not acted on:
- `specs/hal-engine-config-hooks/spec.md` has 2 pre-existing testable statements without test links (the "`catch` gates `onError`" statement lacks a test for the non-Error bypass path, and the "These properties are recorded" paragraph is a meta-statement that should probably move to a background/rationale section).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI failures fixed: spec-links misplaced, callee-below-caller, status-matches-coverage","tdd_next":"acceptance green"}}