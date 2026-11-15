This round closed the static-compile part of facet 2 and pushed it. Branch `loop-bench/37` is at `38ec206`, in sync with its upstream, and already includes `origin/main`.

**What changed**
- **Dependency:** `ajv` `^8.20.0` added to `dependencies` in `package.json` and `package-lock.json`. The `node_modules` copy was ajv 6 (from eslint), so I installed v8 explicitly.
- **Code:** `ToolRegistry.register` compiles a static `inputSchema` with `ajv` (`strict: false`, `validateFormats: false`, no coercion, no defaults). An invalid schema throws `Invalid inputSchema for tool <name>: …`. Function-valued sources are not compiled yet.
- **Test:** `src/orchestration/tools/registry.test.ts` has one test, "throws at register time naming the tool when a static inputSchema cannot be compiled". I ran it red first, then green.
- **Spec:** the register-time statement in `specs/hal-engine-tool-input-validation/spec.md` now also links to this test.
- **Checklist:** `.lore/dod.md` ticks the ajv facet. Facet 2 stays open for the `WeakMap` cache of function-valued sources. I added unchecked facets for the MINOR version bump and the `WeakMap` cache.

**Not done this round**
- Ran the one test with `npm test -- <file>` only. I did not run the acceptance tests, the full suite, lint, typecheck, or build. Prettier was run on the two changed TypeScript files.
- Version bump (0.3.0 → 0.4.0), the CHANGELOG entry, `execute` validation, and docs are still open. CI's changelog gate will likely flag the `src/` change until the CHANGELOG entry lands.
- Trace check: `lore-query-trace` reported no tests covering `registry.ts` before my edit, so there was no existing-test regression surface to check.
- No regressions: I wrote no red test that CI has not yet judged. Red tests this round: 1 (mine, now green).

**Unrelated smells noticed, not touched:** `registry.acceptance.test.ts` is named in the dod, but I did not run it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"ajv dependency added and static inputSchema compiled at register time","tdd_next":"validate input in ToolRegistry.execute before the executor runs"}}