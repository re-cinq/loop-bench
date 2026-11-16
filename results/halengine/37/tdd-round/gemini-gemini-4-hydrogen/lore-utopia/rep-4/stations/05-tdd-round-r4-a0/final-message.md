Resolved all CI findings from `217397c` on branch `loop-bench/37` (committed as `7b4ca36` and pushed; up to date with `origin/main`):

- `src/orchestration/chatOrchestrator.test.ts`: split `params.messages[params.messages.length - 1]?.content` into local variables to satisfy `re-lint/max-member-chain`.
- `src/orchestration/tools/registry.test.ts`: flattened `responses.*` into direct variables (`missing`, `wrongType`, `wrongEnum`, `tooShort`, `wrongUnion`) to resolve all 9 `re-lint/max-member-chain` errors.
- `src/orchestration/tools/registry.ts`: extracted `formatExpectedType` below `formatTypeFailure` so both array and comma-separated string type parameters format union types with `' | '`.
- `specs/hal-engine-tool-input-validation/spec.md`: updated shifted line anchors (`#L147`, `#L180`, `#L186`).

Verification:
- Formatted modified files with `npx prettier --write`.
- Ran `src/orchestration/tools/registry.test.ts` (6/6 passed) and `src/orchestration/chatOrchestrator.test.ts` (23/23 passed); 0 red tests of ours, 0 regressions.
- Ran `check-spec-anchor-names.mjs`, `repoint-spec-anchors.mjs --check origin/main`, `check-spec-links.mjs`, `check-spec-status.mjs`, and `check-doc-blocks.mjs` (all exited 0).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix 217397c CI eslint max-member-chain findings and union type formatting","tdd_next":"acceptance green"}}