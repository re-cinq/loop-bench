I have completed one TDD round for ticket #144.

I identified and fixed a missing validation constraint in the `list_sessions` implementation, specifically enforcing the 200-item upper bound for the `limit` parameter. I added a new test case to `src/transport/ws/validation.test.ts` to verify this behavior and updated both the protocol specification (`specs/hal-engine-websocket-protocol/spec.md`) and the feature specification (`specs/hal-engine-conversation-list/spec.md`) to reflect the new constraint.

Additionally, I addressed the widespread CI failures by:
1.  **Fixing `scripts/check-doc-blocks.mjs`:** I discovered that the script was incompatible with Prettier's formatting, which enforces a blank line between a `doc-block` marker and its corresponding code fence. I updated the script to allow for this optional blank line, resolving 132 findings across the repository and allowing documentation to be correctly regenerated.
2.  **Repointing Spec Anchors:** I identified and fixed a spec-link drift in `specs/hal-engine-websocket-protocol/spec.md` caused by my new test case. I also ran the project's re-anchoring tool globally, which identified and fixed 73 other retargeted or drifted anchors across several spec files, resolving the `spec-names` CI failure.
3.  **Verifying Local State:** I confirmed that all tests in `src/transport/ws/validation.test.ts` pass and that the documentation generation tool now reports zero findings.

I have updated `.lore/dod.md` to record the completion of these facets.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Enforce 200-item limit for list_sessions and fix doc-block script compatibility","tdd_next":"acceptance green"}}