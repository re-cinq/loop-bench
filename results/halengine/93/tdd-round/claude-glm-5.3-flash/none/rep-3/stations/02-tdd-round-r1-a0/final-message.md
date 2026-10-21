Pushed and synced — `origin/main` is already an ancestor of the branch, so no merge was needed and there is no conflict to park the ticket.

## Round summary

**What CI owed and this round paid (facet 4 — the round brief's two findings):**

1. **eslint `re-lint/require-spec-link`** at `src/orchestration/chatOrchestratorUsage.acceptance.test.ts:67` — the test `counts reported rounds while leaving a turn with no reported usage undefined` had no spec citation. Added it to the aggregate-usage statement in `specs/hal-engine-config-hooks/spec.md:28`, in the repo's established `([validated by: <title>](path#L67))` form. The rule matches by resolved path + line span (I read the vendored rule to confirm), and I verified the fix by rebuilding the same corpus index the rule builds — line 67 now indexes against the test's span, alongside the existing L44 link.
2. **changelog** — added the `[Unreleased]` → `Changed` entry for the four changed `src/` files: what `afterModelResponse` now receives (`TurnUsageTotal`, the turn's sum), the `NaN`/`undefined` guarantee, and a migration note saying an existing consumer's numbers grow for tool-heavy turns — the deliberate MINOR-worthy correction — plus why the total-plus-breakdown shape was rejected. `scripts/check-changelog.sh` now exits 0.
3. Recorded the rejected pass-both-shapes rationale in the spec's prose (the ticket wanted it on the issue, which this pod can't edit, so the spec is the discoverable in-repo home), and ticked the dod: both acceptance gates CI already passes, and facet 4.

**Tests:** I wrote none this round — the remaining facet was the lint finding and the changelog, both docs. So no test ran here; CI's test job on the last push was already green (only eslint and changelog failed), and the build on this push is the judge. No formatter run needed: the repo's prettier targets `{src,scripts,smoke}/**/*.ts` only, and this round touched only `.md` files. **Red tests: 0 mine, 0 regressions.**

**Noted, not acted on:** the aggregate-usage statement now sits under a section headed "Measured semantics — out of scope" despite being specified, cited behaviour — a future round could promote it to its own section.

**Unrelated smells:** none beyond the above.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"hooks spec + CHANGELOG record the aggregate-usage behaviour, the rejected breakdown shape, and the previously uncited no-usage-rounds test","tdd_next":"acceptance green"}}