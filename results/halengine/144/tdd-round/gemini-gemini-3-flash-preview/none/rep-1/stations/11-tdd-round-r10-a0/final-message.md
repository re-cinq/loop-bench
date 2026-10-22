I have completed the round by fixing the CI failures in the concurrency test and updating the protocol specification.

### Changes made:
- **Refactored `src/transport/ws/listConcurrency.test.ts`**:
    - Replaced `vitest` imports with `jest` globals to match the project's testing framework.
    - Fixed `SessionStore` mock to be type-compliant, ensuring `create`, `get`, etc., return appropriate `Awaitable` rejections.
    - Replaced non-deterministic `new Date()` calls with fixed timestamps to satisfy linting rules.
    - Consolidated multiple `expect` calls into a single assertion using a composite object, complying with `re-lint/max-expects`.
    - Added the missing spec link citation for traceability.
- **Updated `specs/hal-engine-websocket-protocol/spec.md`**:
    - Explicitly documented that `list_sessions` is non-blocking and does not wait on the session lock, linking it to the concurrency test.
    - Updated the spec's `Status` to `Shipped` as the implementation is now complete and verified.
- **Documentation and Traceability**:
    - Synchronized `docs/getting-started.md` by running `npm run docs:fix` to reflect the latest `full-config.ts`.
    - Ran `npm run spec:names:fix` and `scripts/repoint-spec-anchors.mjs` to ensure all spec citations are accurate and properly anchored.
- **Verification**:
    - Verified the refactored test by running it locally with `node --experimental-vm-modules node_modules/jest/bin/jest.js`, and it passed.

All facets in `.lore/dod.md` were previously marked as done; this round addressed the regressions and documentation gaps that left the build red.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Verify list_sessions does not wait on the session lock (concurrency)","tdd_next":"acceptance green"}}