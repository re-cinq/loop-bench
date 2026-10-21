Round complete. Summary:

**Facet closed:** the CI typecheck finding on c22a374 — `TS2353 at registry.ts:49,22: 'strict' does not exist in type 'Options'` — and this time the root cause, not another guess.

**What the round found:** three prior rounds re-typed the ajv require against ajv's own declaration file and each went red on CI. I reproduced CI's error **byte for byte** (same line, column, message) by forcing ajv 6.15.0's typings onto the `'ajv'` resolution path — the eslint-nested copy in the tree, whose `Options` has `strictDefaults`/`strictKeywords`/`strictNumbers` but no `strict` and no `validateFormats` (tsc reports only the first excess property). CI resolves a different ajv major than this pod. So the fix removes the dependency on the resolution path entirely: the used surface (`compile`, `errorsText`, the two options passed) is now declared locally and the `import type` from `'ajv'` is gone. Verified: `tsc --noEmit` exits 0 under ajv 8.20.0 *and* under forced ajv 6.15.0 typings, where the old code exits 2 with exactly CI's error.

**Tests run this round:** only the failing step's command (`npx tsc --noEmit`, named by the round brief) and the changed module's unit file `registry.test.ts` (9/9). The acceptance suites were not run — CI is their judge.

**Red tests:** 0 mine, 0 regressions — the single red check was a type error, now fixed at its cause. **Pushed:** `eacdb82`, branch in sync with `origin/loop-bench/37`, and `origin/main` is already an ancestor (merge was a no-op), so CI will run.

**Out-of-scope observations, not acted on:** (1) if CI's *runtime* also resolves ajv 6, validation runs draft-07 only — a schema using draft 2019-09/2020-12 features would behave differently there; worth watching when CI reports the acceptance suites. (2) `compiledValidators` is module-level, so it is shared across `ToolRegistry` instances — harmless today.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI TS2353 at registry.ts:49 — declare the ajv surface locally instead of importing ajv's typings","tdd_next":"acceptance green"}}