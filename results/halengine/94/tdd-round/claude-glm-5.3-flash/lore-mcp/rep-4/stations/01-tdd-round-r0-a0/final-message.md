The round is delivered. Summary:

**Round type**: the RED bar was already on the branch — the previous round committed the failing acceptance test (`962a4fc`) pinning this round's facet, citing spec line 26. A second test would have re-pinned the same assertion subject, so this round was GREEN + REFACTOR against that committed red test.

**Facet closed**: `beforeSession` moved inside the `try` in `chatOrchestrator.ts:91-93`, so a throw from it reaches the same `catch` (→ `onError`, unchanged argument shape) and `finally` (→ `afterSession`, then save) as any other turn failure, while still rejecting the caller. By reading, the acceptance test now passes; existing `beforeSession` tests pin only the happy-path order and none pins the old broken ordering, so criterion 4 (existing tests unedited) holds — I edited no test.

**Also delivered** (the ticket's two doc facets, same round since they're one acceptance criterion):
- `specs/hal-engine-config-hooks/spec.md`: the guarantee moved out of "Measured semantics — out of scope" into a new "When `beforeSession` throws" section as one cited statement, recording the explicit answer — `afterSession` fires either way and cannot tell "never allocated" from "allocated and finished", so a releasing hook must tolerate releasing nothing. Status stays `Shipped` truthfully (the statement is cited; `require-status-matches-coverage` holds). The two code links that my added comment line shifted were repointed (`#L150`→`#L151`, `#L148`→`#L149`).
- `CHANGELOG.md`: a `### Fixed` entry under `[Unreleased]` stating what changes for an existing consumer.

**Tests**: this pod ran no tests — the one test that judges the facet is the acceptance test, which this pod refuses by name, and no CI verdict existed yet (`lore_get_ci_failures` → branch not found; no `round-brief.md`). So: 0 red tests of mine known, 0 regressions known; CI's verdict on the push is the judge. Prettier ran on the changed source file (unchanged = clean); no lint/typecheck/build here, per the pod contract.

**Out-of-scope smells noticed, not acted on**: (1) in the `finally`, an `afterSession` hook that rejects would mask the original turn error (the `save` inside its own `try/finally` still runs); (2) the pre-existing `instanceof Error` gate on `onError` (already ticketed); (3) `afterModelResponse` receiving per-round `lastUsage` rather than summed usage (already recorded in the spec as out of scope).

Committed `d161581`, pushed, and the branch merged cleanly with `origin/main` (already up to date); `git status` shows it even with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"beforeSession moved inside the try so its throw reaches onError and afterSession, with the spec guarantee and CHANGELOG entry recorded","tdd_next":"acceptance green"}}