I have fixed the failing test `reports the correct path for nested property validation failures` in `src/orchestration/tools/registry.test.ts`.

The failure was caused by inconsistent property path formatting in validation error messages. In some environments (as seen in CI), Ajv or its configuration was producing paths with dot notation (e.g., `.user.details.age`), while the tests explicitly expected slash notation without a leading slash (e.g., `user/details/age`).

I modified `ToolRegistry.execute` in `src/orchestration/tools/registry.ts` to normalize both dot-notation and leading-slash paths to a consistent slash-separated format. This ensures that validation messages are uniform regardless of the underlying validator's default formatting and matches the project's testing expectations.

I verified the fix by running `src/orchestration/tools/registry.test.ts` and `src/orchestration/chatOrchestrator.test.ts` locally, and both suites now pass.

- Fixed 1 regression identified by CI.
- No new tests were written this round as the focus was on repairing the existing failing test.
- All facets in `.lore/dod.md` remain checked as the repair brings the implementation back to the expected state.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Improve validation reporting by including path for nested required properties","tdd_next":"acceptance green"}}