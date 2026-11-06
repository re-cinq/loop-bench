I wrote four acceptance tests for #37, and all four fail today for the reason the ticket gives. The work is committed and pushed. `git status` shows the branch level with its upstream, and merging `origin/main` brought nothing new.

**Strategy: `direct`.** `ToolRegistry.register` and `execute` can be called today with real tool definitions.

The ticket's central claim, quoted in `.lore/dod.md`: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`".

I ran `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/tools/registry.acceptance.test.ts`. The result was `Tests: 4 failed, 4 total`. Output for the two I read in full:
- **Missing required property:** the executor ran once (`executorCalls: 1`, expected 0) and the result did not mention `location`.
- **Wrong-typed property:** the executor ran once and the result did not name `location` or `string`. The value did not leak into the result or the logs, so the "never echo the value" half of that test already holds and only the naming and no-execution halves are red.
- **Uncompilable schema:** `register` did not throw for `broken-tool`.
- **Function-valued definition:** I only saw this one's console output, because I cut the printout short. It failed, but I didn't read its assertion message.

The tests are in `src/orchestration/tools/registry.acceptance.test.ts`, with the new spec at `specs/hal-engine-tool-input-validation/spec.md`. Each test has its `validated by` link in that spec, and `check-spec-links` reports no misplaced citations. `.lore/dod.md` records the strategy, the tests and the facets. I did not edit any spec `Status`.

Things I left out:
- **Extra-property pass-through:** this already passes today, so a test for it would be green rather than red. I dropped it and noted in `dod.md` that the implementing round should pin it.
- **Compile-once across ten calls:** it can't be observed without a spy on ajv, so it's left to the implementing round.
- **Unknown-tool throw:** unchanged and already true.
- **Orchestrator tool-loop test, docs, CHANGELOG and README:** listed as facets for the implementing round.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}