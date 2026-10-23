The eslint finding is fixed and pushed; the branch is level with `origin/main` and not ahead of its upstream.

- **Finding fixed:** `src/orchestration/orchestratorHelpers.test.ts:35` had no spec link. I added a statement to `specs/hal-engine-config-hooks/spec.md` saying the hook's usage is typed `TurnUsageTotal` rather than per-call `UsageMetadata`, with the inline `([validated by: …](…#L35))` link. That is the only change; no test or source code was touched.
- **Links:** no reanchor script exists in this repo. The new link points at the test's current line 35, and the spec's existing `orchestratorHelpers.test.ts` links (#L29, #L40, #L46) are unaffected because I didn't edit that file.
- **Format:** `prettier --write` on the spec left it unchanged.
- **Merge:** `git fetch origin main` plus merge reported "Already up to date".
- **Lore tools:** the `lore_*` and `lore-query-trace` tools are not available in this session, so I did not query the coverage graph. The edit is to a markdown spec, not a source symbol.
- **Tests:** this round ran no tests here. I wrote no new test, and I did not run the acceptance tests or the existing suite. CI's eslint verdict on the previous push is the only signal, and the next CI run will judge this push.
- **Tests this round:** 0 red tests of mine, 0 regressions. The only red check was the eslint finding above.
- **Facets:** all facets in `.lore/dod.md` were already ticked, so I left it unchanged.
- **Unrelated smells:** none noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"eslint require-spec-link finding at src/orchestration/orchestratorHelpers.test.ts:35 (spec statement added)","tdd_next":"acceptance green"}}