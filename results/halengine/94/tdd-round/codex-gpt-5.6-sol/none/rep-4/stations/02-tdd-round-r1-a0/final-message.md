This round is blocked because the immutable acceptance test is itself invalid:

- It constructs `PromptBuilder` with nonexistent configuration fields.
- It violates the repository’s one-assertion rule with three `expect` calls.
- Fixing either requires editing the acceptance test or weakening unrelated production/lint behavior, both prohibited.
- No files were changed, no tests were run, and no commit was created.
- `lore-query-trace` was unavailable in this environment.

Red tests: 1 acceptance test supplied by the branch; regressions: 0.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The immutable acceptance test has typecheck and lint errors that cannot be corrected without editing it or weakening unrelated repository behavior."}}