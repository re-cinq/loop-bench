I wrote six acceptance tests for #37 in `src/orchestration/tools/registry.acceptance.test.ts`. All six fail, and the branch is pushed and up to date with `origin/main`. I ran them with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/tools/registry.acceptance.test.ts`.

The strategy is `direct`, because `register` and `execute` can be called today. I quoted the ticket's claim at the top of `.lore/dod.md` and listed the later rounds under Facets. I also added `specs/hal-engine-tool-input-validation/spec.md`, whose six statements link to the tests with the repo's `validated by` form. I wrote the line numbers by hand; `scripts/spec-links/reanchor.mjs` doesn't exist in this repo.

Every test fails because validation is absent, not because of an import or fixture problem. After my last edit I only re-ran the suite for the pass/fail count, 6 failed of 6, and did not read each message again. These are the first run's failure messages, read before I changed the passthrough test:

- **Missing `location`:** the executor ran once (`"calls": 1`) and the result did not name `location`.
- **Wrong type:** the executor ran and the result did not name the field or the expected type.
- **Uncompilable schema:** `Expected pattern: /broken_tool/`, `Received function did not throw`.
- **Function-valued definition:** the second call, with the new `city` requirement, still ran the executor (`"calls": 2`) and did not name `city`.
- **No value in logs:** the payload `{location: 42, units: 'jane.doe@example.com'}` was not rejected (`"rejected": false`).
- **Extra-property passthrough:** this one passed on its first run, since today everything passes through. I added a second call with invalid input and assert the executor never sees it, which turned it red.

The ticket's other acceptance items are not covered by these tests. They are the `chatOrchestrator.test.ts` tool-loop test, the compile-once test, the `Unknown tool: <name>` throw pin, `npm run build` plus the dist import, and the docs, CHANGELOG and one-line comment on `execute`. I listed them as Facets for the implementation rounds. The compile-once test needs a seam such as an Ajv spy, which would be a mock, so I left it out.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}