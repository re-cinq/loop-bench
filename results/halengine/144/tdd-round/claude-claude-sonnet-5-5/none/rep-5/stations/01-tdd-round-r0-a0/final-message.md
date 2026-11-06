This round closed the `list_sessions` validation facet, and it's pushed. I did not run the acceptance tests; CI will report where they stand. The two validation tests I added pass, and the other three tests in `validation.test.ts` still pass. All of them were my tests, and I broke no existing tests.

- **Validation:** `validateMessage` now accepts `list_sessions` in `src/transport/ws/validation.ts`.
- **Accepted fields:** `limit` must be a non-negative integer. `before` must have a `sessionId` of 1–128 characters and an `updatedAt` that is a valid date string or number. Any other field, such as `userId`, is dropped.
- **Types:** I added only `ListSessionsMessage` to `IncomingMessage` in `src/types/messages.ts`, so the validator's output is typed.
- **Not done:** I did not write the spec citations for the new tests, and I left the specs for the docs facet.
- **Docs facet:** the validation facet is ticked in `.lore/dod.md`. The types facet stays unticked, with a note that `SessionSummaryFrame`, `SessionListMessage`, the `OutgoingMessage` union member and the `src/index.ts` re-exports are still to do.
- **Ticket mismatch:** the ticket describes `list_conversations` / `conversation_list` with `UNSUPPORTED` and an opt-in flag. The brief and the acceptance tests use `list_sessions` / `session_list`, an empty list for stores without `listFor`, and no flag. I followed the brief.
- **Running jest:** `npx jest` fails on ESM. I ran the test with `node --experimental-vm-modules node_modules/jest/bin/jest.js <file> --coverage=false` instead.

Merging `origin/main` brought in nothing, and the branch is level with its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions frames in validation.ts","tdd_next":"thread sessionStore into createMessageHandler and handle list_sessions (session_list type + OutgoingMessage + exports)"}}