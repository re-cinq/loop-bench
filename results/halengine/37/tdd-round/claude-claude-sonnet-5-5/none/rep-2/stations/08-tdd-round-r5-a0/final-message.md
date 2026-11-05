This round repaired the red build CI reported on the previous push (typecheck and test). I committed and pushed the fix, and the branch is in sync with its upstream. `origin/main` was already merged in.

- **The fix:** `src/orchestration/tools/registry.ts` now resolves the Ajv constructor as `default ?? module`. The previous `.default` access threw "Ajv is not a constructor" under the jest ESM loader (typecheck separately rejected `.default`). I also typed the error objects in `execute` as `ErrorObject`, which may clear the `instancePath` typecheck error. I couldn't confirm that here, because typecheck is off-limits in this pod.
- **Local check:** `registry.test.ts` passes (4 of 4). That file existed before this round and I wrote no new test.
- **Not run:** the acceptance tests and the typecheck. CI judges both on this push.
- **Red tests:** none were mine and none were regressions. The earlier red tests came from the Ajv constructor failure.
- **`.lore/dod.md`:** I added a ticked "CI repair 4" line. Facet 4 stays open, and the next round takes it.
- **Still to do:** the required, wrong-type, register-throws and no-leak log unit tests, the `chatOrchestrator.test.ts` tool-loop test, the one-line doc comment on `execute`, and the docs, README, `.specify/spec.md`, ADR-002, example and CHANGELOG updates.
- **Unrelated smell:** `.lore/dod.md` has duplicated and contradictory leftover checklist lines.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair 4: Ajv constructor resolved as default ?? module, ErrorObject annotated","tdd_next":"registry.test.ts required/wrong-type/register-throws/no-leak unit tests, chatOrchestrator tool-loop test, execute doc comment, docs/README/.specify/ADR-002/example"}}