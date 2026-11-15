I closed one facet this round, but I couldn't fix the two CI failures the brief listed, and they will probably come back red.

**CI failures (not fixed):** The `typecheck` and `test` failures look like CI loaded the wrong version of `ajv`. All three errors ("`default` does not exist", "no `instancePath` on `ErrorObject`", "Ajv is not a constructor") are what `ajv@6` produces. This branch's `package-lock.json` puts `ajv@8.20.0` at the root, with `ajv@6` only nested under eslint, and `npm ls ajv` confirms that layout here. The same code passes locally. Changing the code to work with `ajv@6` would mean dropping the version the ticket chose, so I left it alone. Someone needs to check whether those checks install this branch's lockfile or reuse cached `node_modules` from `main`. `lore_get_ci_failures` returned "branch not found", so I couldn't read the job logs. I've added this to `.lore/dod.md` as an open facet.

**This round (WeakMap cache facet):**
- **Red:** I added a test to `src/orchestration/tools/registry.test.ts`: "validates a function-valued tool against the inputSchema returned for that call". It failed as expected: the second call reached the tool even though the schema it returned had changed.
- **Green:** `ToolRegistry` now has a `validatorFor` helper. It uses the validator compiled at registration for a fixed tool, and for a tool whose definition comes from a function it builds the validator from that call's schema, cached by the schema object in a `WeakMap`. `registry.test.ts` passes, 3/3.
- **Refactor:** nothing needed.
- **Traceability:** the matching statement in `specs/hal-engine-tool-input-validation/spec.md` now links to the new test at `#L42`. The existing `#L4` and `#L19` links are still correct.
- **`.lore/dod.md`:** I ticked this facet and added two new ones: the CI `ajv` mismatch, and tests for "static schema compiled once across ten calls" and "extra property passed through unchanged".

The only test I ran was `registry.test.ts`, plus Prettier on the files I changed. I committed and pushed, `origin/main` added nothing new to merge, and the branch is level with its upstream.

**Red tests:** one was mine, and it's now green. I don't know of any regressions I caused, and no fresh CI result exists for this push yet.

**Smell I left alone:** a function-defined tool whose schema can't be compiled now throws during `execute`, instead of returning a rejection. Neither the spec nor the ticket says how that case should behave.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference (WeakMap) and validate per call","tdd_next":"Resolve CI's ajv@6 resolution (lockfile pins ajv@8), then unit-test static schema compiled once across ten execute calls"}}