No drift from main. The branch is clean and pushed. Summary of this round's work:

**Two commits pushed (c571656, 7efb601):**

1. **c571656** — Extracted `eventually`, `delegatingTo`, and `cleanupServersAndClients` into `wsTestSupport.ts`; removed duplicates from `conversationList.acceptance.test.ts` and `sessionResume.test.ts`; fixed `prefer-early-return` in `askAfterConnect`; added `list_sessions`/`session_list` changelog entry. Fixed the eslint and changelog CI failures.

2. **7efb601** — Re-ran `spec:names --fix` after the refactoring shifted test line numbers (31 citations repointed). Fixed the spec-names CI failure that the refactoring introduced.

**All local spec checks now pass:** `check:spec-anchor-names` clean (794 citations), `check:spec-links` clean, `check:spec-status` clean.

**Unrelated smells noticed but not touched:** The `wsTestSupport.ts` `stopEngines` function doesn't do the `eventually(() => wss.clients.size === 0)` wait that the two test files needed—it could be unified with `cleanupServersAndClients` in a future refactor.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI quality-gate failures: test-helper deduplication, spec anchor repointing, changelog entry","tdd_next":"facet 5: document list_sessions and session_list in websocket-protocol spec, or acceptance green if CI is now fully green"}}