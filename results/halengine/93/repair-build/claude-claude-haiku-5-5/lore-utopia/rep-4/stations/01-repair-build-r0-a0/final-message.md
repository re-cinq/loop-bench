The four eslint findings are fixed and pushed as `db677b1`, but I could not confirm green locally. The branch is not ahead of its upstream, and `origin/main` merged with nothing to add.

**What CI named** (all in `src/orchestration/orchestratorHelpers.test.ts`, judged at `19eaa4d`):
- Three `re-lint/require-spec-link` errors on the `accumulateUsage` tests at lines 29, 35 and 41.
- One `re-lint/max-expects` error at line 35, where the test had two `expect` calls.

**What I changed:**
- **`orchestratorHelpers.test.ts`**: the defined-side test now makes one `expect` over an array, `expect([accumulateUsage(undefined, usage), accumulateUsage(usage, undefined)]).toEqual([usage, usage])`. The assertion is the same and no `it(` line moved. I did not delete or loosen the test.
- **`specs/hal-engine-config-hooks/spec.md`**: added three cited statements, one per `accumulateUsage` test, each with a trailing `validated by` link to the test's `it(` line. Those are lines 29, 35 and 40. The last one was 41 before my edit merged two lines, so I corrected it to 40 after reading the file.
- Prettier reported both files unchanged.

**What I did not verify:**
- I did not run eslint, because the pod rules forbid it. The three spec-link anchors and the `max-expects` fix are checked by reading only. CI is the judge.
- The lore MCP server failed to connect, so I could not call `lore-query-trace` or `lore_get_ci_failures`. I worked from the round brief's verdict and the repo's AGENTS.md spec-link convention.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"ci_blocked":"Fixed all four eslint findings and pushed db677b1; not verified green locally (eslint barred in this pod, lore MCP unavailable), so CI must judge the push."}}