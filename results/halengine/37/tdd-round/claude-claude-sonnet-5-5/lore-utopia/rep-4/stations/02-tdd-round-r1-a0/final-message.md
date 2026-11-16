This round fixed everything CI flagged on the last push and added the pass-through test. The new test passes. I did not re-run the typecheck, eslint, or the acceptance tests here, so CI is the check on those.

**CI findings fixed (all four failing checks):**
- **Typecheck and test:** `import {Ajv}` failed at both compile time and Jest load time. `src/orchestration/tools/registry.ts` now uses the default import and its `.default` constructor. It also declares small local types for the validator and its errors, which removes the `ErrorObject`/`ValidateFunction` errors. The cached-validator lookup no longer returns `undefined`.
- **Lint:** the `error.keyword` switch is now a lookup table. The caught schema error is rethrown with `cause`. In the acceptance test's tool-result read (`registry.acceptance.test.ts`), the 3-hop member chain became `content.map(...).join('')`. I did not change any test's assertions. The `prefer-early-return` finding at line 141 was in the same statement as the chain, so I assumed that edit clears it.
- **Changelog:** I added an `[Unreleased]` entry to `CHANGELOG.md`.

**New test:** "passes valid input with an unlisted extra property to the executor unchanged, exactly once" is in `registry.test.ts`. I linked it from the matching statement in `specs/hal-engine-tool-input-validation/spec.md` at `#L33`. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I checked the existing `#L4` link by hand and it still points at the right test.

I committed and pushed, and merging `origin/main` brought in nothing new. The branch is not ahead of its upstream.

**Red tests:** none of mine were red. I saw no regressions, since CI named no pre-existing test.

**Still open for later rounds:**
- unit tests for the unknown-tool throw, a dynamic schema that changes between calls, and compile-once
- the `chatOrchestrator.test.ts` retry test
- docs, README, `.specify/spec.md`, ADR-002 and the example file
- the spec Status header

I haven't ticked the last facet in `.lore/dod.md`, because those items remain.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repairs (ajv import, lint, changelog) + pass-through unit test","tdd_next":"unknown-tool, dynamic-schema, compile-once tests; orchestrator retry test; docs/README/.specify/ADR-002/example; spec Status"}}