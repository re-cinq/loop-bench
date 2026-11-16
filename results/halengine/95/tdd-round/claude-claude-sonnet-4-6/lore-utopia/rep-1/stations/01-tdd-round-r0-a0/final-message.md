Branch is clean and pushed. Summary:

- **RED test written**: added `'calls onError when the provider throws a string, not an Error'` at the end of `chatOrchestrator.test.ts` — confirmed RED before the fix
- **Fix implemented**: in `chatOrchestrator.ts` catch block, removed the `error instanceof Error` guard and added a `toErrorInstance` helper that wraps any non-Error value in `new Error(message, {cause: value})`
- **CHANGELOG updated**: added entry under `### Fixed` in `[Unreleased]`
- **dod.md updated**: ticked the coercion facet
- **0 regressions**: all 27 tests in `chatOrchestrator.test.ts` pass

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"coerce non-Error rejection to Error before calling onError","tdd_next":"confirm existing Error-instance tests remain green and add CHANGELOG entry (or acceptance green if CI confirms)"}}