The round is pushed, but CI will stay red. The acceptance test itself is wrong, and the rules say to stop there rather than edit it.

**What I fixed (committed as `docs(orchestrator): specify beforeSession throw path` and pushed; branch is up to date with `origin/main`):**
- **Changelog finding:** `CHANGELOG.md` now has an `[Unreleased]` entry for the `beforeSession` change, with the migration note for existing `onError` and `afterSession` hooks.
- **Spec (facet 2):** `specs/hal-engine-config-hooks/spec.md` moves the guarantee out of "out of scope" into its own section. It records what a hook can assume (no provider call, no tool, no later hooks ran) and that `afterSession` cannot tell whether `beforeSession` completed. The decision is that `afterSession` runs after a failed `beforeSession`, and a deployer that needs the distinction records its own allocation. The `onError` test now has an inline validated-by link (`#L31`).
- **My test, `beforeSessionOnError.test.ts`:** it used `baseSystemPrompt`, which is not a `PromptBuilderConfig` key, so I changed it to `identity`. I folded three expects into one and dropped the rejection assertion, since the acceptance test already pins the rejection. I ran only this file: 1 passed.
- **`.lore/dod.md`:** ticked the spec and changelog facets, and added an open facet for the acceptance test.

**What is blocked:** `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts` is wrong, and I did not edit it.
- **Typecheck:** it passes `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on `PromptBuilderConfig`.
- **Eslint:** it has 3 expects (max 1).
- **Duplicate code:** it shares 17–19 lines with my test. Both copies are flagged, so my side cannot be cleared without changing this file.

Fixing it means changing an acceptance test's fixture and assertion shape, which the rules reserve for a decision. You need to choose whether to allow that edit.

**Other notes:**
- No test was red on CI, so no regressions and no red tests of mine. The findings were all lint, type and changelog.
- The Lore MCP server failed to connect, so I could not run `lore_get_ci_failures`, `lore-query-trace` or `lore_write_memory`. I used `round-brief.md` for the CI verdict.
- I did not run the acceptance tests, lint, typecheck or the build.
- Not fixed, noted only: the two `afterSession`/`save` interactions on the failure path are documented but not separately tested.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is wrong: wrong PromptBuilder config keys fail typecheck, 3 expects break max-expects, and it duplicates beforeSessionOnError.test.ts; needs a decision before editing an acceptance test"}}