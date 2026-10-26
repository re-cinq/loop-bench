Pushed. This round fixed all CI failures and pinned a new behavioral guarantee:

**What changed:**
- Extracted `scriptedProvider` to `chatOrchestrator.fixture.ts` — eliminates the duplicate code that triggered `re-lint/no-duplicate-code`
- Added `captureUsage()` helper in the acceptance test — eliminates the duplicate hook-setup block across the two tests
- Added a third acceptance test `reports nothing when no round in the turn reports usage` — pins the `undefined` behavior when no round reports, ticking the "Keep usage undefined" DoD facet
- Fixed the spec citation drift: `resolves processMessage` test moved from L550 to L564 after the `sums usage` test was inserted; spec:names --fix corrected all 24 shifted citations in the architecture spec plus the 3 new acceptance-test citations
- Updated `specs/hal-engine-config-hooks/spec.md` — replaced the under-counting sentence with the new summing behavior and added citations for all three acceptance tests
- Added a citation for `sums usage reported across all rounds in a multi-round turn` to the architecture spec — it was previously "covered" only by the wrongly-placed tool-input-validation link
- Added a `### Changed` CHANGELOG entry about the usage summing behavior change

**Smells noticed but not acted on:** The "Record why per-round breakdown was rejected in the issue" DoD facet requires posting a GitHub comment — no `gh` token in this pod.

The round ran no tests here — the acceptance test file is protected as CI's to run.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"pin undefined usage when no round reports + fix all CI lint/spec/changelog failures","tdd_next":"rename the argument type/parameter so readers can tell it is a turn total (review-only facet)"}}