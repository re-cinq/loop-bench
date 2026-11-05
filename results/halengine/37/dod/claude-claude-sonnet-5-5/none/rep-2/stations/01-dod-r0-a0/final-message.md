I committed and pushed four red acceptance tests in `src/orchestration/tools/registry.acceptance.test.ts`. The branch is in sync with its upstream and already up to date with `origin/main`.

**Strategy: `direct`.** `ToolRegistry.execute` and `register` are callable today and fail on behaviour. The claim in `.lore/dod.md` is quoted from the ticket: "`ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor without ever checking the declared `inputSchema`".

I ran the file with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`. I ran this before I dropped the pass-through test and folded it into the fourth test, so I did not re-run the final four-test file. Three of the four tests failed in that run:

- **Missing required property:** `Expected substring: "location"` / `Received string: "ok"`. The executor ran on `{}`.
- **Wrong type:** the same failure, `Received string: "ok"` for `{location: 4815162342}`.
- **Uncompilable schema:** `Expected pattern: /weather/` / `Received function did not throw`.
- **Function-valued definition:** that run showed `Expected substring: "location"` / `Received string: "ok"` for `{city: 'Oslo'}` against the first schema. The pass-through assertion I folded in was not in that version, so it has not been run.

All of these fail because no validation exists, which is the ticket's claim.

- **Spec:** the ticket requires `specs/hal-engine-tool-input-validation/spec.md`, which did not exist. I created it with Status `Draft`, and each statement carries a `([validated by: …])` link to its test. `check-spec-anchor-names` confirmed all four links.
- **Pass-through test dropped:** the standalone "extra property passes through unchanged" test already passes today, so it would not be red. I folded that assertion into the function-valued test, which is red.
- **Not covered here, left as facets:** the compile-once test and the chatOrchestrator retry-loop test. Compile-once needs a seam on the compiler. The "Unknown tool throws" test would pass today. The ticket's other items (docs, README, CHANGELOG, `ajv` in `dependencies`) are listed as facets in `.lore/dod.md`.
- **Finding:** `ajv` is in `node_modules` but not in `package.json` `dependencies`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}