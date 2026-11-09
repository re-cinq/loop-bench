Round delivered. Summary:

**Facet closed:** the aggregate-usage contract — all four dod facets in one coherent change:
- `afterModelResponse`'s third argument is now `totalUsage?: TurnUsage` — a new exported type (`src/types/ai.ts:84`) whose name and JSDoc make "this is a sum" explicit at the signature, no orchestrator-reading required.
- `addRoundUsage` (`src/orchestration/orchestratorHelpers.ts:44`) sums each token field over rounds that reported and preserves `undefined` when none did; the orchestrator accumulates it per round instead of keeping only `lastUsage`.
- The no-tool regression guard `receives collected response text and usage` stays unedited and green.
- CHANGELOG `Changed` entry written with a migration note stating existing consumers will record larger numbers for tool-heavy turns; the hooks spec statement was already updated last round; the two documented code blocks mirroring the declaration were regenerated (`check-doc-blocks --fix`).

**Ran here:** my new red→green unit test (`sums each token field over the rounds that reported…` in `orchestratorHelpers.test.ts`) plus the guard's file `chatOrchestrator.test.ts` — 29/29 green, prettier clean. The acceptance tests dod.md names were not run in this pod; CI judges the push. The script that re-anchors spec links flagged one code anchor my edit had left stale (`chatOrchestrator.ts#L150` → `#L153` in the config hooks spec); fixed and `repoint-spec-anchors --check` now passes.

**Red tests:** none mine, none regressed locally.

**Smells noticed, not acted on:** (1) the config-hooks spec cites source-line anchors into `chatOrchestrator.ts` that rot on every orchestrator edit and are excluded from auto-repair once a spec's anchor set diverges from main — citing a pinning test instead would end that; (2) the generated examples in README/docs still name the param `usage` while the signature now says `totalUsage` — cosmetic, a rename in `example/server.ts` would sync them.

Pushed `d1158e7` to `origin/loop-bench/93`, working tree clean, branch up to date with its upstream and already current with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"afterModelResponse receives TurnUsage summed across every provider call, skipping unreported rounds","tdd_next":"acceptance green"}}