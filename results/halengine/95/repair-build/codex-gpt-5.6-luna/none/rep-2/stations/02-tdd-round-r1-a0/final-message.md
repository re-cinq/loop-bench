The branch is pushed and up to date. The fix addressed both CI failures:
- **spec-names**: repointed 2 spec citations from `#L53`/`#L64` to `#L54`/`#L65` using `npm run spec:names -- --fix`
- **eslint re-lint/require-spec-link**: the ESLint rule reads spec files to verify tests are cited; the wrong line numbers caused a mismatch, which is now resolved

This round had 0 tests written by me (it was a repair round fixing CI failures from the previous push). 0 regressions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"reanchor spec citations after line insertion","tdd_next":"acceptance green"}}