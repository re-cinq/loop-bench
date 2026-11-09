Landed: commit `d55116b` pushed, merge with base was a no-op (origin/main is still the merge-base), and `git status` confirms the branch is up to date with its upstream — the work is on the remote, where CI judges it next.

## Round summary

**What the brief owed and what it turned out to be.** The brief named CI failures on `7aa3cb5`: typecheck (`TS2693` at `registry.ts(60,30)`) and test (providerFactory stack + orchestration coverage collapse to 7.21%). Two previous rounds had written these off as "phantom findings" in `.lore/dod.md`, claiming PR #84 merged green and the branch deleted. I re-established ground truth and found those claims **false**: `git ls-remote` shows the branch live, origin/main is still the branch's merge-base (nothing merged), and the real GitHub repo doesn't know this mirror at all. The findings are real and I reproduced the whole fingerprint.

**Diagnosis.** CI's environment compiles and tests against an install whose top-level `ajv` is **6.15.0** (main's hoisted eslint copy, present on disk here too). Under ajv 6's `export =` typings the named `Ajv` import is type-only → exactly the reported TS2693; under its runtime, errors carry `dataPath` (dot paths) with no `instancePath`, so the wrong-type rejection message dropped the field name → the registry/orchestrator assertions fail → coverage collapses. The providerFactory stack trace is jest's captured `console.warn` from the VertexAI deprecated-SDK notice — I reproduced it locally on a **passing** suite (5/5); it's noise, not a failure.

**The round (red-green-refactor, one facet).**
- **Red**: new unit test `renders ajv errors from either major shape...` in `registry.test.ts` (failed on the legacy `dataPath` shape).
- **Green**: `registry.ts` now imports `Ajv` as the default behind a local constructor shape (constructable under both majors' typings; bound to the class at runtime under both — verified by probing both installed copies) and `describeSchemaErrors` reads `instancePath ?? dataPath`. My test passes 7/7; the paths-mapped `tsc` probe reproduces TS2693+TS2559 on the pre-fix code and is clean post-fix under ajv 6 typings, and the repo's own `tsc --noEmit` is green under ajv 8.
- Spec statement gained the `[validated by]` link (`registry.test.ts#L130`); `.lore/dod.md` gained the ticked facet and had the two false verification notes replaced with the corrected account.

**Red tests**: all findings were this branch's own (its ajv dependency under a 6-installed environment); **zero regressions** to main-era tests. Formatter run; no lint/typecheck beyond the brief-named step; acceptance tests not run — CI is their judge. Unrelated smells noticed, untouched: the vertex deprecation `console.warn` noise in test output, and `describeSchemaErrors` now being exported (needed to pin the renderer).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"tolerate either installed ajv major (6 or 8) in typings and runtime","tdd_next":"acceptance green"}}