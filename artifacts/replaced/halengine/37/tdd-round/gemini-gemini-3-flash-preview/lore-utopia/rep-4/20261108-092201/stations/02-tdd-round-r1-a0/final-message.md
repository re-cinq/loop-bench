I have completed the round for ticket #37 "Validate tool input against the registered inputSchema".

### Changes Made
- **ToolRegistry Implementation**:
  - Implemented input validation in `ToolRegistry.execute` using `ajv`.
  - Added a `getDynamicValidator` helper that utilizes a `WeakMap` (`validatorCache`) to cache compiled validators for dynamic schemas by their object reference.
  - Implemented an error message formatter that names failing field paths and constraints while redacting offending values from both the returned `ToolResponse` and log lines.
  - Added a one-line documentation comment to `execute` pointing to the validation specification.
  - Fixed a type error in the `Ajv` constructor options and adjusted the import to use the named export.
  - Added the `cause` property to the `Error` thrown during static schema compilation in `register`.
- **Testing**:
  - Added new unit tests to `src/orchestration/tools/registry.test.ts` covering:
    - Validation of missing required fields in `execute`.
    - Caching of compiled validators for dynamic schemas.
  - Fixed ESLint violations in `src/orchestration/tools/registry.acceptance.test.ts` related to early return patterns and member chain depth.
- **Traceability & Documentation**:
  - Updated `specs/hal-engine-tool-input-validation/spec.md` with inline parenthetical links to the new unit tests and verified existing links.
  - Updated `.lore/dod.md` to mark the validation implementation facet as completed.
- **Project Integrity**:
  - Formatted all modified files with Prettier.
  - Verified changes with the new unit tests (3/3 passing).
  - Merged `origin/main` into the feature branch.

### Findings & Observations
- The `ajv` version 8 requires `import { Ajv } from 'ajv'` for correct typing of `Options` in this project's `NodeNext` configuration.
- The `re-lint/max-member-chain` rule caught a 3-hop chain in the acceptance tests which was refactored using destructuring to comply.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Validate input in ToolRegistry.execute","tdd_next":"Add unit tests in chatOrchestrator.test.ts and update docs"}}