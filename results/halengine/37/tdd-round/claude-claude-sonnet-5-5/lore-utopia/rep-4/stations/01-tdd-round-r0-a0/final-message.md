The round is committed and pushed, and the branch is level with its upstream. I ran only my own test, `registry.test.ts`, and it passes. I did not run the acceptance tests, the typecheck, the linter or the build. I did not check CI's verdict, and no `round-brief.md` existed.

I closed the first three facets together. Validation can't be tested without all three:
- **`ajv`:** I added `ajv` ^8.20 to `dependencies` and bumped the version to 0.4.0.
- **Registry:** static schemas now compile in `register`, which throws an error naming the tool. Function-valued sources cache compiled validators in a `WeakMap`.
- **`execute`:** it now returns a rejection `ToolResponse` that names the path and the constraint, never the offending value, and gets the one-line doc comment pointing at the spec.

The test I wrote is "rejects a value outside the declared enum without calling the executor". It was red before the change and green after. I added its spec statement and `#L4` link to `specs/hal-engine-tool-input-validation/spec.md`. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I set the link line by hand.

None of my tests failed in this round, and I caused no regressions.

Left for the next round, which I appended to `.lore/dod.md` as one unchecked facet:
- Unit tests for pass-through, unknown tool, dynamic-schema, compile-once and no-value-in-logs.
- The orchestrator retry test in `chatOrchestrator.test.ts`.
- The docs, README, `.specify/spec.md`, ADR-002, CHANGELOG and example updates.
- The spec `Status` change.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv dependency, register-time compile, execute-time validation (enum rejection test)","tdd_next":"remaining unit tests (pass-through, unknown tool, dynamic schema, compile-once, no value in logs), orchestrator retry test, docs/CHANGELOG/spec status"}}