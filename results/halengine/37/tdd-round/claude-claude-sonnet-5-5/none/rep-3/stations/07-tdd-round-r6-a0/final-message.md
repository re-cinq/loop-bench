This round only repaired CI's red build; facet 4's remaining work is still open. The push landed and the branch is level with its upstream.

- **Ajv import:** `registry.ts` now picks Ajv's constructor from either module shape (the module itself, or its `.default`). It also reads error fields through a local type instead of ajv's own `ErrorObject`.
- **Likely cause:** CI's typecheck errors look like they came from ajv 6, not the ajv 8.20 pinned in `package-lock.json` and installed here. I couldn't reproduce that, so I can't confirm the new code compiles under CI's install.
- **Spec status:** `specs/hal-engine-tool-input-validation/spec.md` now says `Shipped`, as the eslint rule asked, since all 9 statements carry test links.
- **Tests:** `registry.test.ts` passed 5 of 5 locally. I didn't run the acceptance tests, typecheck or lint, per the brief.
- **Red tests:** CI's red tests were all fallout from the same Ajv import failure. None were regressions from other code.
- **No-leak log test:** I didn't add a separate one, because the acceptance test already pins it.
- **Still open for the next round:** the `chatOrchestrator.test.ts` retry-loop test, and the docs, README, `.specify/spec.md`, ADR-002, `weather-tool.ts` and CHANGELOG updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: Ajv constructor resolved for either module shape, spec status Shipped","tdd_next":"chatOrchestrator retry-loop test, then docs/README/.specify/ADR-002/CHANGELOG"}}