I committed and pushed five acceptance tests for #37, and all five fail today. I ran only that file: 5 failed, 5 total.

Strategy is `direct`. `ToolRegistry` is already a real entry point, so the tests call `register` and `execute` with real tools and no doubles. `.lore/dod.md` opens with the ticket's central claim, quoted. The branch is not ahead of upstream, and merging `origin/main` was a no-op.

The tests are in `src/orchestration/tools/registry.acceptance.test.ts`. Each fails because validation is absent:
- **Missing required property:** `execute('weather', {})` returns `"sunny"`. The test expected a result containing `location`, and the executor ran.
- **Extra property:** valid input with an unlisted key passes today. The test also calls `execute` with `{units: 'metric'}`, which must be rejected, so it goes red on that second call.
- **Wrong-typed field:** `{location: 4929138847}` returns `"sunny"`. Expected a result containing `location`, with neither the result nor any log line holding the number.
- **Uncompilable schema:** `register` with `{type: 'not-a-json-schema-type'}` fails with `Expected pattern: /weather/ — Received function did not throw`.
- **Function-valued definition:** after the schema changes to require `city`, `execute` returns `"sunny"`. Expected a result containing `city`.

I also added `specs/hal-engine-tool-input-validation/spec.md` with five statements, each linked to its test by line number. The ticket names no spec, so I created this one and did not edit any `Status` field.

Not covered, and listed under Facets in the DoD:
- the compile-once count, which would need a spy on the validator;
- the `chatOrchestrator.test.ts` retry loop;
- the unknown-tool throw, which passes today;
- the docs, README, `.specify/spec.md` and CHANGELOG items.

I did not run `scripts/spec-links/reanchor.mjs`, because the links were written against the final line numbers. I made no spec-anchor stamp beyond the inline links, since I couldn't find how `tests.list` reads one.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}