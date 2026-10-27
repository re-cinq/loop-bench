Implemented and pushed the validation facet for `list_sessions`.

- Added message types and exports.
- Added validation for limits, cursors, and unknown fields.
- Added one focused test; red first, green after implementation/refactor.
- Updated `.lore/dod.md`.
- Commit: `b12aee3`
- Branch is clean and synced with upstream.
- Acceptance suite, lint, and typecheck were not run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate list_sessions frames","tdd_next":"Thread sessionStore into createMessageHandler"}}