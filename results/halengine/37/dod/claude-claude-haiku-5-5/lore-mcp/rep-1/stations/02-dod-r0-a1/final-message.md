The acceptance tests for #37 were already on this branch from an earlier round. I checked them against the ticket, fixed the dod, and pushed. The branch is up to date with its upstream, and `origin/main` merged cleanly with nothing to merge.

**What I changed in this round**
- `.lore/dod.md` named the CI step `Test`. The workflow step is `Test (with coverage floor)`, which runs `npm run test:coverage`. I corrected that in the commit.
- I removed the extra `## Red bar` section, since the dod is supposed to follow the exact required shape. Prettier then re-indented the path code spans.
- Commit `ba3d682` (`docs(tools): name the CI test step and trim dod to shape`) is pushed.

**Checks on the existing work**
- The five tests are in `src/orchestration/tools/registry.acceptance.test.ts`. Their titles match the `validated by:` citations in `specs/hal-engine-tool-input-validation/spec.md`, and the `#L` line numbers match.
- Prettier passes on the dod, the spec and the test file.
- The dod's central-claim quote matches the ticket.

**Red bar**

Run with: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/tools/registry.acceptance.test.ts`

```
Tests:       5 failed, 5 total
  ● returns a rejection naming a missing required property ...
    Expected substring: "location"   Received string:    "Forecast: sunny"
  ● rejects a wrong-typed property ...
    Expected substring: "location"   Received string:    "Forecast: sunny"
  ● throws at register time for an uncompilable schema ...
    Expected pattern: /broken_tool/   Received function did not throw
  ● validates each call against the schema its source returns ...
    Expected substring: "city"   Received string:    "Forecast: sunny"
  ● hands a rejected tool call to the model as a result ...
    Expected substring: "location"   Received string:    "Forecast: sunny"
```

Each failure is the absence of validation: the executor's string comes back where a rejection should, or `register` does not throw. The first Jest attempt was blocked by the pod's Bash hook even though it named a file. A retry with the same path ran normally.

**Gaps you should know about**
- Five tests do not cover every acceptance criterion in the ticket. Three are missing as tests and are recorded only as dod facets: the log-line and returned-text redaction check, the compile-once check across ten calls, and the extra-property passthrough pin. The unknown-tool pin is also a facet, and it passes today.
- The ticket is broad: the changelog, docs, spec edits, `package.json` and build checks are all in scope. Its own acceptance criteria point toward splitting it, and I did not stretch the five tests to cover everything.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}