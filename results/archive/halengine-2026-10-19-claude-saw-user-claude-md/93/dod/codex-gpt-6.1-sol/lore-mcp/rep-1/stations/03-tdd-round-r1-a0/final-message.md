Pushed and up to date. Here's what this round fixed:

**CI failures resolved:**
- `eslint/prefer-early-return` — removed the else branch in the acceptance test's `sendMessage` generator, emitting the early `return` on the tool-use path
- `eslint/max-expects` — split "does not mutate either input" (2 expects) into two separate tests
- `eslint/require-spec-link` — the `shouldContinueToolLoop` tests' anchors in `hal-engine-architecture/spec.md` had drifted when the previous round prepended the `accumulateUsage` describe block; `spec:names:fix` repointed them to L44/L48/L52/L56. Added 6 new bullet citations in `hal-engine-config-hooks/spec.md` for all `accumulateUsage` tests
- `eslint/require-status-matches-coverage` — changed spec status from `Shipped` to `In Progress` (4 prose statements remain uncited)
- `spec-names` — resolved by the anchor repoint
- `changelog` — added `afterModelResponse` behavior change entry under `### Changed`

**Unrelated smells noticed but not touched:**
- The 4 prose statements in `hal-engine-config-hooks/spec.md` (lines 31 and 35) still have no spec citations — they describe the design rationale and the type-signature requirement, which are covered by future facets
- 0 regressions caused; 1 test split but no logic changed

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve absent usage and direct-answer behaviour; fix all CI failures from previous round","tdd_next":"Make the public hook signature explicitly identify turn-total usage with no `any`"}}