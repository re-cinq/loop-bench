I have resolved the type error in `src/orchestration/tools/registry.ts` where the `strict` option was not recognized in the Ajv constructor. By using named imports for both the `Ajv` class and the `Options` type, I ensured correct type resolution in the ESM environment.

Additionally, I implemented the missing facet test in `src/orchestration/tools/registry.test.ts` to verify that static tool schemas are compiled exactly once during registration and reused across multiple executions. This was achieved by spying on `Ajv.prototype.compile`.

Finally, I manually updated the line number links in `specs/hal-engine-tool-input-validation/spec.md` to ensure accurate traceability, as the automated script skipped the file because it was not yet present in the `main` branch.

All unit tests in `src/orchestration/tools/registry.test.ts`, `src/transport/ws/connectionHandler.test.ts`, and `src/orchestration/chatOrchestrator.test.ts` pass locally.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add unit tests in src/orchestration/tools/registry.test.ts and link the remaining statements","tdd_next":"acceptance green"}}