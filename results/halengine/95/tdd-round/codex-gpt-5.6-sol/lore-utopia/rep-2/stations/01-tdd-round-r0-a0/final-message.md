Implemented and pushed one TDD round:

- Wrapped non-`Error` rejections with `Error`, preserving the original as `cause`.
- Original rejection still propagates unchanged.
- Added focused coverage for `undefined`.
- Updated spec traceability and checked the implementation facet.
- Focused test passed: 1 test.
- RED accounting: 1 test was mine; 0 regressions.
- Branch is synchronized with `origin/main` and fully pushed.

Commit: `d5a4f4d fix(orchestrator): report non-Error rejections`

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejections so onError always fires","tdd_next":"add the Unreleased CHANGELOG entry for existing consumers"}}