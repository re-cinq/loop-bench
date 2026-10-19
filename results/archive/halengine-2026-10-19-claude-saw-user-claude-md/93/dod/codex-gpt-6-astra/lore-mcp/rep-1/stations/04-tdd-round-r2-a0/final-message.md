Branch is up to date and clean. The fix: the ESLint `require-status-matches-coverage` rule flagged the spec as "Shipped" but only 14 of 18 testable statements carried validated-by links. The 4 unlinked statements are rationale sentences in the "Turn usage — #93" intro paragraph (the design decision prose) — not individual behaviors that can have test links. Setting the status from `Shipped` to `In Progress` correctly reflects the 14/18 partial coverage tier.

**Regressions: 0. Tests written this round: 0** (this was a mechanical doc fix for the ESLint failure, no test round needed — the CI fix was the deliverable).

Unrelated smell noticed: the remaining unchecked facets in dod.md (`receives collected response text and usage` staying unedited, and the public hook signature type annotation) may still be outstanding — CI will confirm whether those are still red.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix ESLint spec-status coverage: set spec Status to In Progress matching 14/18 citation tier","tdd_next":"acceptance green"}}