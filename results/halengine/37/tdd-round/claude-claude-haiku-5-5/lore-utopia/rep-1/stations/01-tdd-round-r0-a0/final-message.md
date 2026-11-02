This round closed the dependency facet and the register-time compile, but not the whole compile facet. Pushed as `3aef355` on `loop-bench/37`, which is in sync with its upstream. Nothing was merged, since `origin/main` added nothing to the branch.

- **Test (red, then green):** I wrote `src/orchestration/tools/registry.test.ts`. It asserts that `register` throws naming the tool for an uncompilable static `inputSchema`. It failed with "did not throw", then passed once `register` compiled the schema with ajv and wrapped any error with the tool name. I ran only that file. No acceptance test and no other suite ran here.
- **Red tests:** one was mine (now green). No regressions: I did not run the wider suite, and no CI verdict existed for this round.
- **Dependency:** `ajv@^8.17.1` (installed 8.20.0) is in `dependencies`. `package-lock.json` changed for two packages, which I did not inspect in detail. The `strict: false, validateFormats: false` options are set, and no coercion, defaults or `additionalProperties` are added.
- **Version:** bumped `0.3.0` to `0.4.0` (MINOR), per the facet.
- **Spec:** the register-time statement in `specs/hal-engine-tool-input-validation/spec.md` now also cites my unit test. The existing link to the acceptance test is kept.
- **Formatting:** ran prettier on the changed TS files only. I did not run lint, typecheck or build.
- **`.lore/dod.md`:** ticked the ajv/version facet. The compile facet stays open and is annotated. I added an unchecked facet for WeakMap caching of function-valued sources and reuse of the static validator on each `execute`.

Still open: validation inside `execute` (returning a rejection `ToolResponse`), the four acceptance tests, the chat-orchestrator retry test, the doc and CHANGELOG updates, and the spec-link re-anchoring. `ToolRegistry.execute` does not validate input yet.

Smells noticed and left alone: none.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv dependency + MINOR bump; register-time schema compile (static tools)","tdd_next":"validate input in ToolRegistry.execute with WeakMap-cached validators for function-valued sources"}}