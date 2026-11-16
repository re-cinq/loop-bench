Completed the final facet and addressed the `src/orchestration/tools/` coverage gap from CI commit `ba58bc3`:

- **Code & Unit Tests:**
  - Simplified `formatValidationError` and `formatErrorPath` in `src/orchestration/tools/registry.ts` (removing redundant `extractMissingProperty` and `readErrorPath` helpers while keeping `instancePath` / `dataPath` ajv v6/v8 support).
  - Added unit tests in `src/orchestration/tools/registry.test.ts` for static `inputSchema` reuse across 10 `execute` calls and `Unknown tool: <name>` on unregistered tools.
  - Added a tool-loop retry test in `src/orchestration/chatOrchestrator.test.ts` verifying schema rejections feed back as `tool_result` so the model can retry and resolve.
  - Ran `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts`: 29/29 tests passed (`registry.ts` coverage: 80.76% stmts, 69.35% branches, 78.26% funcs, 86.36% lines, all above `jest.config.js` thresholds). Red tests: 0 yours, 0 regressions (acceptance tests and the full CI suite were not run locally).
- **Traceability, Version, Docs & Changelog:**
  - Linked the remaining statements and updated `Status` to `Shipped` in `specs/hal-engine-tool-input-validation/spec.md` (`check-spec-anchor-names`, `check-doc-blocks`, `check-spec-links`, `check-spec-status`, and `check-doc-regions` all passed; `check-doc-paths` had 0 findings on edited files and only flagged unbuilt `dist/` targets).
  - Bumped `version` from `0.3.0` to `0.4.0` in `package.json` and `package-lock.json`.
  - Updated `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, `adrs/ADR-002-response-validation.md`, `CHANGELOG.md` (with `## [0.4.0] - 2026-11-16` and migration note), and checked off the final facet in `.lore/dod.md`.
- **Unrelated smell noted (not modified):** `ToolRegistry.get` and `ToolRegistry.has` in `src/orchestration/tools/registry.ts` have no unit test coverage from prior rounds.
- **Git:** Committed as `3265fd9`, pushed to `origin/loop-bench/37`, merged `origin/main` (already up to date), and confirmed clean working tree.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Bump the package version MINOR in package.json and package-lock.json, add unit tests in src/orchestration/tools/registry.test.ts and src/orchestration/chatOrchestrator.test.ts, link the remaining statements in specs/hal-engine-tool-input-validation/spec.md, and update example/weather-tool.ts, docs/adding-a-tool.md, README.md, .specify/spec.md, adrs/ADR-002-response-validation.md, and CHANGELOG.md","tdd_next":"acceptance green"}}