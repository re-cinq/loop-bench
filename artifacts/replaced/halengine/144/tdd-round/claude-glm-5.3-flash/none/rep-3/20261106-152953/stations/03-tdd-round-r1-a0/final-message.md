Pushed and in sync with `origin/main`; the branch reports no ahead/behind against its upstream.

## Round summary

**What the round owed:** CI's verdict on e96d881 named 13 eslint errors across 5 files. All 13 are repaired in 334091c:

- **Duplicated test helpers** (8 findings across `conversationList.acceptance.test.ts`, `sessionResume.test.ts`, `ws/sessionList.test.ts`): the shared `eventually`, the five-member store double, the summary row and the recording `listFor` now live once in `src/transport/wsTestSupport.ts` as `eventually`, `delegatingTo`, `storedSummary`, `recordingListFor`, plus a `trackServer` so hand-started engines reach the shared teardown. `stopEngines` now drains each server (`wss.clients.size === 0`) before stopping it — the drain both socket suites used to inline. No assertion moved; I grepped the acceptance diff to confirm the only removed assertion-adjacent line was the recording closure itself.
- **`prefer-early-return`** in the acceptance helper: the `connected` happy path now runs flat behind two single-statement guards.
- **`messageHandler.ts:127`**: the two-line comment is one line.
- **`validation.ts`**: the 3-way switch became a lookup table keyed by the wire name; the two nested ifs became flat reads (`readLimit`/`readCursor` returning `{error} | {value}`). Error strings are byte-identical, and cursor field order (updatedAt before sessionId) is preserved.

**Tests:** I ran three unit files by name — `validation.test.ts` (6 passed, guards the validator refactor), `sessionList.test.ts` (2 passed) and `sessionResume.test.ts` (25 passed, guards the teardown change). The acceptance file `conversationList.acceptance.test.ts` was repaired but **not** run here — it is on the dod list; CI judges it. No test was written this round: the findings are a repair, and the diff is the deliverable.

**Red tests:** CI named no failing tests, only eslint — 0 mine, 0 regressions.

**Smells noticed, not acted on:** `wsTestSupport.startEngine` pins its URL to `/hal/ws/c1`, which is why the two socket suites can't reuse it and `trackServer` had to exist — unifying those start paths would remove the last near-duplicate pair; and `sessionResume.test.ts` silences the logger file-wide while its sibling acceptance suite captures lines, two conventions for the same job.

**dod.md:** ticked the eslint-repair facet; the spec-documentation facet stays open for the next round, with CHANGELOG, getting-started via `example/full-config.ts` + `npm run docs:fix`, and the MINOR bump behind it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair the 13 eslint findings CI named on e96d881 (duplicate test helpers, validator dispatch and guard clauses, wrapped happy path, two-line comment)","tdd_next":"document list_sessions and session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md, then CHANGELOG, getting-started via example/full-config.ts + npm run docs:fix, and the MINOR bump"}}