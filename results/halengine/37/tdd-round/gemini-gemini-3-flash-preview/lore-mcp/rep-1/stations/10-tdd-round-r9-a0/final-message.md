I have fixed the CI failures reported in the previous round.

Specifically:
- In `src/orchestration/tools/registry.ts`, I changed the `Ajv` import to use the named export `{ Ajv }`. This resolves the TypeScript error where `strict` was reported as missing from the `Options` type, which occurred because `tsc` was likely picking up older `Ajv` v6 types from a transitive dependency when using the default import.
- In `src/orchestration/tools/registry.test.ts`, I updated the "normalizes complex tool responses" test to use a valid `OutgoingMessage` type (`error` with `code` and `message`) instead of an invalid `text` type. The `OutgoingMessage` union in this project does not include a `text` type (that is reserved for `MessageChunk`), which caused a `TS2352` conversion error.
- I verified the fixes by running `src/orchestration/tools/registry.test.ts`, `src/orchestration/chatOrchestrator.test.ts`, and `src/orchestration/tools/registry.acceptance.test.ts` locally; all passed.
- I updated the comparison links in `CHANGELOG.md` to include the `0.4.0` and `0.3.0` versions.
- I synchronized the branch with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures","tdd_next":"acceptance green"}}