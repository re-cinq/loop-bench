This round fixed the one lint failure from CI's red build. I ran no tests, because the failure was a missing spec link and not a code defect.

- **Fix:** `require-spec-link` flagged `counts reported rounds while leaving a turn with no reported usage undefined` (line 67 of `chatOrchestratorUsage.acceptance.test.ts`). No statement in the spec linked to it. I added one to `specs/hal-engine-config-hooks/spec.md`, directly after the aggregate-usage statement, pointing at `#L67`. It says rounds that report no usage don't spoil the total, and a turn where nothing reported leaves the usage `undefined`.
- **Delivery:** The change is committed and pushed. Merging `origin/main` brought in nothing new, and the branch is level with its upstream.
- **Red tests:** none were mine and none were regressions. The red build was the lint finding only.
- **Not fixed:** I didn't run the linter here, so CI's next verdict is what confirms the fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec link for partial-usage acceptance test (eslint require-spec-link fix)","tdd_next":"acceptance green"}}