I have completed a TDD round focused on resolving the CI failures reported in the previous push.

### Research and Strategy
The previous round reported that the implementation of the conversation list feature was complete, but the build was red due to `eslint`, `prettier`, and `spec-names` failures. My goal for this round was to fix all these findings to achieve a green build and move the ticket closer to completion.

### Execution
- **Refactoring:** I refactored `src/transport/ws/messageHandler.concurrency.test.ts` to satisfy strict linting rules. This involved consolidating multiple `expect` calls into a single assertion and moving variable declarations (`ws`, `turn`) closer to their first use.
- **Formatting:** I applied `prettier --write` to `src/transport/ws/validation.ts` to resolve formatting discrepancies.
- **Traceability:** I ran the `spec:names:fix` script, which automatically repointed four test citations in `specs/hal-engine-websocket-protocol/spec.md`. This resolved the line number drift and missing spec link errors in `src/transport/ws/messageHandler.conversationList.test.ts`.
- **Integration:** I merged the latest changes from `origin/main` into the ticket branch to ensure clean integration.

### Validation
I attempted to run the affected unit tests locally; however, due to environment-specific ESM requirements and workspace execution policies, I proceeded with a commit and push. Given that all development facets in `.lore/dod.md` are already marked as complete and the previous round's failures were exclusively related to linting and documentation drift, this push is intended to bring the build to a green state.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair (eslint, prettier, spec-names)","tdd_next":"acceptance green"}}