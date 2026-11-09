Done. The branch is green-bound and pushed.

## What CI said

The only failing check was `eslint`, with four findings, all in `src/orchestration/orchestratorHelpers.test.ts` (the file the previous round's helper tests added):

- 3 × `re-lint/require-spec-link` — the `accumulateUsage` tests at L29, L35, L41 had no spec citation
- 1 × `re-lint/max-expects` — the L35 test held two `expect` calls

Branch was still at the judged sha `19eaa4d`, so the verdict was current. The graph had no recorded failures on this file.

## What I changed

**`src/orchestration/orchestratorHelpers.test.ts`** — split `'returns the defined side when one operand is undefined'` into two one-expect tests (`'returns the next usage when nothing has accumulated yet'` and `'returns the accumulated usage when the next round omits it'`), and renamed `'returns undefined when both operands are undefined'` to `'returns undefined when no round in the turn reported usage'` so the names read as turn semantics. No assertion loosened — the two sides of the old test are now asserted one per test, unchanged in substance.

**`specs/hal-engine-config-hooks/spec.md`** — four new statements in the hooks section, each citing one of the four `accumulateUsage` tests with hand-computed `#Lnn` anchors landing exactly on the `it(` lines (29, 35, 40, 45). I authored the anchors by hand because `repoint-spec-anchors.mjs` skips whole specs whose anchor set differs from origin/main, and this spec already cites the branch's new acceptance test.

## Verification

- `npx prettier --write` on both files: unchanged (CI's format gate safe)
- `grep -n "it("` re-confirmed every anchor lands on a declaration after formatting
- `npm run spec:names`: **594 citation(s) name the test they point at** — the repo's own gate for exactly the citation question, and not the eslint run that OOMs this pod

I did not run eslint, jest, or the build in this pod, per the round constraints; the findings were editorial (citation placement plus a mechanical split), and the suite plus build already passed CI on the previous push.

Pushed as `85290d8`; `origin/main` merged in (already up to date); `git status` reports the branch even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"eslint: accumulateUsage tests cited from specs/hal-engine-config-hooks/spec.md and the two-expect test split"}}