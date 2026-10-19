Branch is pushed and up to date. 

**What I fixed:** The ESLint `re-lint/callee-below-caller` rule requires functions to be declared below their callers. `createSession`, `createLookupRegistry`, and `captureUsage` were all declared above `runAndCaptureUsage` (which calls them), so I moved them below it.

**The MongoDB timeout failure** in `mongoRedaction.test.ts` is an infrastructure issue (Mongo failing to start within 120s in CI) — it's unrelated to this ticket's changes and not something I can fix in code. That red test was 0 of my own, 0 regressions I caused.

**Unrelated smell noticed:** `.coverage-check/` and `.coverage-check2/` directories in the workspace root are untracked — not acted on.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix callee-below-caller lint errors in acceptance test","tdd_next":"acceptance green"}}