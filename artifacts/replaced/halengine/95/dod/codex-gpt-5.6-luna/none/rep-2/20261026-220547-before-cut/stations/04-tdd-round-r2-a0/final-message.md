Branch is pushed and up to date. This round fixed all three ESLint CI failures:
- Consolidated the acceptance test's 5 expects into one `toMatchObject` call
- Added the required spec link for the unit test at chatOrchestrator.test.ts:311  
- Changed the tool-responses spec status from Draft to In Progress

No regressions were caused (0 regressions, 0 new tests written — this was a mechanical CI-repair round).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"eslint ci failures fixed (max-expects, require-spec-link, require-status-matches-coverage)","tdd_next":"acceptance green"}}