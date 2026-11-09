Pushed and in sync with upstream — `git status` shows the branch is not ahead of `origin/loop-bench/94`, and `origin/main` merged clean (already up to date).

## Round summary

This was a repair round: the round brief's `CI reported failures` on 44eb878 named three findings, all of which are fixed in commit `1f5daff`:

1. **typecheck** — the acceptance test built `PromptBuilder` with `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig`, none of which exist on `PromptBuilderConfig` (whose only required key is `identity`). It now constructs `new PromptBuilder({identity: 'You are HAL.'})`.
2. **eslint `re-lint/max-expects`** — the same test had 3 `expect` calls (max 1). Per the rule's own prescription ("assert one object with `toEqual`"), it now collects one observed object — `{rejection, onErrorArg, afterSessionRan}` — and asserts it in a single `expect(observed).toEqual({...})`. The three pinned facts are unchanged: the rejection still reaches the caller, `onError` received the thrown error, `afterSession` ran.
3. **eslint `re-lint/require-status-matches-coverage`** — the previous round renamed the section `Measured semantics — out of scope` → `Measured semantics`, which exposed 5 more statements as testable (12 testable, 7 linked) under a `Shipped` header. The cited guarantee stays under `Measured semantics`; the two recorded flaws the ticket marks out of scope (`instanceof Error` gate — its own issue; `lastUsage` under-count — HALEngine#93) moved under `Recorded flaws — out of scope`, restoring full coverage: **7 testable / 7 linked → `Shipped` entitled**, confirmed with the vendored `statementCoverage` counter.

The spec's `#L32` citation was repointed to the test's new line and verified with `node scripts/check-spec-anchor-names.mjs` (7 citations name their tests, exit 0); there is no `reanchor.mjs` in this repo, so I re-verified the two moved source anchors by hand — `chatOrchestrator.ts#L151` and `#L149` are untouched and still say what their statements claim. `.lore/dod.md` records the closed facet.

**Red tests: 0 mine, 0 regressions** — CI's failures were typecheck/lint, not test failures, and no assertion's meaning changed. Unrelated smells: none observed beyond the two documented out-of-scope flaws the spec already records under their own issues.

This round ran **no tests locally**: the only test file involved is the acceptance test `.lore/dod.md` lists, which is CI's to run, and typecheck/eslint/build are barred in this pod. Prettier passed over the changed test file; CI judges the rest on this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair CI findings on 44eb878: PromptBuilder typecheck, single-expect assertion, spec status/coverage split (7/7 linked, Shipped)","tdd_next":"acceptance green"}}