Four acceptance tests are committed and pushed in `src/orchestration/tools/registry.acceptance.test.ts`. Three of them fail for the ticket's stated reason; the other two were not observed failing. Strategy is `direct`, because `ToolRegistry.execute` and `register` are real entry points you can call today.

I ran only that file, with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/tools/registry.acceptance.test.ts`. The output I have is the failure detail for the first two tests, quoted below. The pipe to `head -70` cut off before the third and fourth, so I did not see them fail, and no pass/fail summary was captured. Read against the code, both should fail too.

- **Missing required property:** the executor was called once and the result does not name `location`.
  ```
  - "calls": 0,    + "calls": 1,
  - "result": true, + "result": false,
  ```
- **Wrong-typed field:** the executor was called once and the result does not name the path or the type. The value-leak check passes today, as it should.
  ```
  - "calls": 0,             + "calls": 1,
  - "namesPathAndType": true, + "namesPathAndType": false,
  ```
- **Uncompilable schema at `register`:** `register` does not throw today, so this should fail.
- **Function-valued schema that changes between calls:** the executor still runs against the new schema, so this should fail.

I also added `specs/hal-engine-tool-input-validation/spec.md` with one statement per test, each linked to its test. `.lore/dod.md` opens with the ticket's claim and lists the tests and the facets for later rounds. The branch merged cleanly with `origin/main`, which was already up to date, and it is not ahead of its upstream.

Not covered, left for the implementing rounds' own tests:
- extra-property passthrough, which already passes today
- the compile-once count
- the `chatOrchestrator` retry-loop test
- log redaction
- docs, README and CHANGELOG

I did not stamp a separate spec-anchor field because I couldn't find how this repo's descriptors expose it. The spec links are inline only.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}