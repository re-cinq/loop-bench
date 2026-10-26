Done. Pushed commit `49e3974`.

**Round summary:**
- **Root cause of CI failure**: Coverage thresholds (`statements: 91.3%`, `lines: 91.92%`) broken by uncovered lines added in the previous round — `messageHandler.ts:375-377` (catch block) and `validation.ts:27,33,43,110` (input guards).
- **Fix**: Added 5 unit tests covering those paths — `listFor` rejection → `SERVER_ERROR` in `messageHandler.test.ts`, and 4 input-guard cases in `validation.test.ts`. Both files are now at 100% statement/line coverage.
- **Spec citations**: Added two new spec statements in `hal-engine-websocket-protocol/spec.md` with citations pointing to the new test line numbers.
- All 703 tests pass; no unpushed commits.