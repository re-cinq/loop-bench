Branch is up to date with its upstream and merged with `origin/main` — the round is delivered.

**What this round did:**

1. **Both CI findings from the brief fixed:**
   - `chatOrchestrator.ts` — `describeRejection` returned `String(error)` from a bare `catch` (`re-lint/no-catch-as-control-flow`). It now reads `JSON.stringify` through a `jsonText` probe whose catch returns the `undefined` sentinel — the exact shape the rule blesses, matching the existing `parseWsData` precedent. Behavior is provably identical for every input class (JSON-able, `undefined`/symbol/function, cyclic).
   - `onErrorNonError.acceptance.test.ts:12` — `new Date().toISOString()` (`re-lint/no-nondeterministic-tests`) replaced with a fixed literal timestamp.

2. **Facet closed:** the `undefined`-rejection pin (criterion 2's tail) — new test in the acceptance file asserting `onError` receives an `Error` with a non-empty message while the caller still receives `undefined` unchanged. The spec's guarantee bullet gains its citation (`#L82`); the `#L53`/`#L64` links were left intact by appending after them. `dod.md` ticked, with the lint repair recorded as a closed facet.

**Test status:** `chatOrchestrator.test.ts` ran here — 27/27 green, covering the `asError`/`describeRejection` path the refactor touched. The acceptance file itself **cannot run in this pod**: the guard refuses it because `dod.md` lists it, so the new pin is CI's to judge on this push (it shares the harness and code path of the object-rejection test CI already passed). Red tests attributable to this round: none known; regressions: none (the previous red was eslint-only; the Jest step passed).

**Unrelated smells noticed, not acted on:** none beyond what CI named.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pin a rejection with undefined reaches onError (criterion 2's tail) + both eslint findings from the brief repaired","tdd_next":"acceptance green — CI's verdict on 0ab5871 decides"}}