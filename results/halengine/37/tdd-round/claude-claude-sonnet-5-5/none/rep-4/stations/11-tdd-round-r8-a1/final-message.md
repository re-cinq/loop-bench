I closed the last open facet, the documentation round, and pushed it. This round wrote no new test and ran no tests, since the facet is documentation only. The branch is up to date with `origin/loop-bench/37` and already contains `origin/main`.

- **Docs updated:**
  - `example/weather-tool.ts` and the matching block in `docs/adding-a-tool.md` no longer cast defensively and default to `'Unknown'`.
  - The "Cast input fields" and "Handle missing input" bullets in `docs/adding-a-tool.md` now say input has already passed the schema, unknown keys may remain, and a rejection goes back to the model.
  - `README.md` now says the schema is enforced.
  - `.specify/spec.md` records that a rejection is a tool result, that `DEFAULT_MAX_TOOL_ROUNDS` bounds retries, and that extra properties pass through.
  - `adrs/ADR-002-response-validation.md` notes that tool inputs are already validated by `ToolRegistry.execute`.
  - `CHANGELOG.md` already had its entry, so I left it alone.
- **CI brief:** the red verdict in `round-brief.md` was on `b9d8a3c` (the `Ajv` named-import errors). The later commit `b356fbe` changed `registry.ts` to `AjvModule.default`. I did not re-run anything, so I can't confirm that fixes the typecheck and test failures. CI on this push is the check. The red tests were the acceptance and registry suites that failed to load, not regressions in older tests. That makes none of them regressions I caused, but they stay red until CI re-runs.
- **Open items for the next round:** the `.lore/dod.md` facet box is still unticked. The commit doesn't touch `.lore/dod.md`, so tick the "remaining docs" facet there once CI is green.
- **Unrelated smells:** I noticed none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"docs: weather example, adding-a-tool guide, README, .specify/spec.md, ADR-002","tdd_next":"acceptance green"}}