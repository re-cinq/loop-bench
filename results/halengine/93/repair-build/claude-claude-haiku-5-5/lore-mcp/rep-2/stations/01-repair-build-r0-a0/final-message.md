The eslint failure is fixed and pushed to `loop-bench/93` as commit `446aff4`. The branch is up to date with its upstream, and the merge with `origin/main` was a no-op.

**What CI named:** four errors in `src/orchestration/orchestratorHelpers.test.ts`. The branch had not moved past the judged sha, so I went ahead with the fix.

- **`re-lint/max-expects` (line 35):** the "returns the defined side" test made two `expect` calls. I split it into two tests, one per operand order. Each test keeps the same assertion it had.
- **`re-lint/require-spec-link` (lines 29, 35, 41):** I added inline `[validated by: …]` links to `specs/hal-engine-config-hooks/spec.md`:
  - Line 18 (sums across provider calls) now also links the summing test at `orchestratorHelpers.test.ts#L29`.
  - Line 19 (undefined handling) now also links the three helper tests at `#L35`, `#L40` and `#L45`.

The line numbers in those links match the current test positions, which the anchor-drift tooling depends on.

**Checks run:**
- `prettier --write` on the two changed files: both unchanged.
- Jest on `orchestratorHelpers.test.ts` and `chatOrchestrator.acceptance.test.ts`, using the repo's own `node --experimental-vm-modules node_modules/jest/bin/jest.js`: 2 suites, 10 tests, all passed.

**Not run:** eslint, as the brief requires, and typecheck or build. CI's eslint run is the judge of the lint fix. I first ran vitest on the file by mistake; it failed with `describe is not defined` because this repo uses Jest, not vitest. That failure was my invocation, not the code.

**Commit history:** my first commit lacked the required `Co-Authored-By` trailer. I amended it and force-pushed with `--force-with-lease`. This only rewrote my own commit from a few seconds earlier.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: split a two-expect usage test and added spec links for the orchestratorHelpers accumulateUsage tests"}}