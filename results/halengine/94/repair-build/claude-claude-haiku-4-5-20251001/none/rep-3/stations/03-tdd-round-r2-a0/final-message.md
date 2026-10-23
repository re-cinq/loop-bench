The fix was straightforward: the ESLint rule `re-lint/require-spec-link` rejected the test "throws from beforeSession to the caller" (line 34) because no spec statement cited it with a `([validated by: ...](path#L34))` link. I added the missing link to the existing `beforeSession` guarantee statement in `specs/hal-engine-config-hooks/spec.md`, alongside the three links already there.

No regressions were introduced — only a doc-only change to a spec file. The DoD facets were all already ticked; this round fixed the one remaining CI finding.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"add missing spec link for 'throws from beforeSession to the caller' test","tdd_next":"acceptance green"}}