I have fixed the CI failures and completed the implementation for ticket #37 "Validate tool input against the registered inputSchema".

Key changes made:
- **Registry Fixes**: Resolved TypeScript errors in `src/orchestration/tools/registry.ts` by correctly typing Ajv error parameters and ensuring compatibility with Ajv 8.
- **Unit Tests**: Updated `src/orchestration/tools/registry.test.ts` to include all tests requested by the ticket, including validation of missing properties, wrong-typed fields, redaction of sensitive data, and dynamic schema resolution.
- **Orchestrator Verification**: Added a tool-loop recovery test to `src/orchestration/chatOrchestrator.test.ts` to verify that schema rejections are fed back to the AI model for correction.
- **Traceability**: Added and verified spec links in `specs/hal-engine-tool-input-validation/spec.md` for all new and existing tests.
- **Documentation**: Updated `README.md`, `docs/adding-a-tool.md`, `example/weather-tool.ts`, and `.specify/spec.md` to reflect the new automatic validation behavior and advise developers on trusting validated input.
- **ADR & Changelog**: Updated `adrs/ADR-002-response-validation.md` to record that tool input validation is now implemented and enhanced the `CHANGELOG.md` entry for version 0.4.0.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add the remaining unit tests and update documentation/specs","tdd_next":"acceptance green"}}