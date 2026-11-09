Round delivered. Summary:

**What CI named (all 8 findings fixed):** The usage-sum commit moved every `orchestratorHelpers.test.ts` test down four lines, so the architecture spec's citations pointed at `#L11/15/19/23` while the tests sat at `#L16/20/24/28` — that red both `require-spec-link` (eslint) and `spec-names`. The three new `sumUsage` unit tests (`#L34/38/42`) and the second acceptance test (`counts reported rounds…`, `#L67`) had no spec statement citing them at all.

**What I changed** (specs + dod only, no source, no tests):
- `specs/hal-engine-architecture/spec.md` — repointed the four stale citations; added three statements citing the `sumUsage` tests in § Across rounds.
- `specs/hal-engine-config-hooks/spec.md` — added the statement citing the missing-usage acceptance test; re-anchored the `onError` gate citation `chatOrchestrator.ts#L150` → `#L152`, which this branch's `TurnUsage` import had shifted (found by re-verifying links in the file I was editing, per the re-anchor requirement).
- `.lore/dod.md` — appended and ticked the traceability facet; left the two acceptance boxes and the no-tool-guard box unticked, because CI's Test step never ran (the job died at eslint) and there is no verdict to tick against.

**Verified locally:** `spec:names` (the named failed step) green — 593 citations name their tests; `check:spec-links` 0 misplaced; `repoint-spec-anchors --check origin/main` 0 stale/unresolved/mislabelled; `docs:check` and `check:spec-status` 0 findings (insurance on gates CI never reached). eslint itself cannot run in this pod, so its 8 findings are closed by construction: each citation's line falls inside its test's span, and only the two CI-flagged test files differ from main, so no other test's coverage moved. No `.ts` changed, so the formatter had nothing to do.

**Red tests:** 8 findings, all on this ticket's own branch tests — 0 regressions (no pre-existing test went red; the suite never executed).

**Smells noticed, not acted on:** `sumUsage` takes an array but its only caller always passes a two-element pair; and `TurnUsage` is a bare type alias of `UsageMetadata`, so a consumer's typechecker sees it as interchangeable with a single call's usage — the parameter name and JSDoc carry the distinction, not the type.

Committed as `c69e3a8`, pushed, branch up to date with `origin/loop-bench/93`; `origin/main` had nothing to merge.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"traceability citations: all 8 CI-named require-spec-link findings and the stale spec-names lines fixed, every branch test now cited by a spec statement","tdd_next":"acceptance green — CI's first Test/Build/anchor verdict on the branch; if green, tick the two acceptance facets and the no-tool guard"}}