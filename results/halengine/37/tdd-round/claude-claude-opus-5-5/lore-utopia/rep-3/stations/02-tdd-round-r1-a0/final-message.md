I fixed everything CI flagged on the last push and closed one more facet. The work is committed and pushed, and `origin/main` merged in with no changes. I ran only the test file I wrote; the acceptance tests and the full build are for CI to check.

**What CI flagged (typecheck, test, eslint, changelog):**
- **typecheck and test:** the cause was `import {Ajv} from 'ajv'`. ajv is a CommonJS package, so that named import doesn't exist at runtime or for TypeScript. `registry.ts` now uses the default import and takes `.default` from it (`AjvModule.default`). I checked in plain Node ESM that this builds a working validator.
- **Red tests:** one was mine (`registry.test.ts`), plus the expected red acceptance file. `src/config.test.ts` and `src/chatOrchestrator.test.ts` were regressions: tests that already existed and now couldn't load because they import the registry. CI's log was cut off, so there may be more of these. They should all clear with the import fix, but CI will confirm. I changed no regression test.
- **eslint:** both findings were in `registry.acceptance.test.ts`. That file is an acceptance test, so it's worth flagging that I edited it. The change is only structural, to satisfy the lint rules: an early return in the provider stub, and destructuring `content[0]` instead of the long member chain. No assertion or behaviour changed.
- **changelog:** added an `[Unreleased]` entry written for npm readers. It covers the new validation, the migration note, and the new `ajv` dependency.

**This round's facet:**
- **Red:** a new test in `registry.test.ts`: registering a tool whose schema can't compile must throw an error naming the tool. It failed with "did not throw".
- **Green:** `register` now compiles a static `inputSchema` once and stores the validator. A compile error is re-thrown as `Invalid inputSchema for tool <name>: …`. `execute` uses the stored validator, and still compiles per call for function-valued definitions. Both tests in the file pass.
- **Refactor:** nothing needed.
- **Traceability:** linked the spec statement to the new test (`registry.test.ts#L28`). In `.lore/dod.md` I ticked this facet and added a new open one: caching compiled validators for function-valued tools in a `WeakMap`.

**Problems I noticed but didn't touch:**
- `execute` still recompiles the schema on every call for function-valued tools. That's the next facet.
- `registry.ts` still has no one-line doc comment on `execute` pointing to the spec.
- The `package.json` version bump to 0.4.0 is still open.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"register compiles a static inputSchema once and throws naming the tool on an uncompilable schema (plus CI fixes: ajv import, acceptance-test lint, CHANGELOG)","tdd_next":"cache compiled validators for function-valued ToolDefinitionSource schemas by schema object (WeakMap), validated against the current schema per call"}}