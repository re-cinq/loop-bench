Round complete. The branch is pushed and up to date with its upstream (`c22a374`), working tree clean, `origin/main` had nothing new to merge.

**What this round owed and paid** — the round brief named exactly one CI finding: typecheck TS2693 at `src/orchestration/tools/registry.ts:44`, twice on the same line. Root cause: `typeof AjvClass` under `import type {Ajv as AjvClass}` uses a type-only import in a value position, which is illegal. Worse, that cast being in an error state meant the downstream `new Ajv(...)`, `compile(...)` and `errorsText(...)` calls had never been checked against a real type — three rounds of blind fixes on the same line because the interop shape kept moving. The fix removes the moving part entirely: the require result is now typed `AjvConstructor | {default: AjvConstructor}`, where `AjvConstructor` is a local `new (options?: Options) => AjvInstance` built from ajv's own type-only exports. It's legal in annotation position and doesn't depend on how tsc models the ajv module, so it can't swing with the module model again. The runtime mechanism (createRequire, class off the value-or-`.default` binding) is untouched — CI's test step had already proven it works there.

**Verification here** — a scoped `tsc --noEmit` on `registry.ts` alone (one file, no emit, no build) exits 0, which also gives those previously-unchecked downstream calls a real type; `registry.test.ts` runs 9/9. The full typecheck step and the four acceptance suites remain CI's verdict on the push.

**Bookkeeping** — `.lore/dod.md` gains a ticked repair facet for the a0b9833 findings, and the 7bde3fc facet's "typecheck clean" claim is corrected the way the d9e05da facet was. The four "Done when these pass" boxes stay unticked — they're CI's to green-light.

**Red tests** — 0 mine, 0 regressions: the red check was the typecheck step, not a test.

**Unrelated smells noticed, acted on none**: the module-level `new Ajv(...)` constructs an ajv instance whenever the registry module is imported, tool or no tool — acceptable now, but it moves construction cost to import time.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI findings from a0b9833: TS2693 at registry.ts:44, ajv class typed off its instance type","tdd_next":"acceptance green"}}