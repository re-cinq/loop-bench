I have fixed the red build for ticket #95.

The CI failure was caused by a lint error in `src/orchestration/onErrorNonError.acceptance.test.ts` where `new Date()` was used in a test, violating the `re-lint/no-nondeterministic-tests` rule. I replaced the non-deterministic call with a fixed ISO timestamp string.

I verified the fix by:
1. Running the affected test suite using `jest`, which passed.
2. Confirming that `specs/hal-engine-config-hooks/spec.md` and `CHANGELOG.md` correctly document the new behavior where `onError` is called for every rejection, wrapping non-`Error` values in an `Error` instance with the original value as the `cause`.
3. Running the formatter on the changed file.

I have committed the change and pushed it to the `loop-bench/95` branch, and merged `origin/main` to ensure the branch is up to date.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"fixed a non-deterministic Date call in the acceptance test that was causing a lint failure"}}