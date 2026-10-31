Completed and pushed `91df2fa` (`fix websocket validator registry`).

- Added a focused regression test for inherited validator keys.
- Fixed the validator registry and the two reported camel-case lint findings.
- Updated spec citations and `.lore/dod.md`.
- Ran only `src/transport/ws/validation.test.ts`: green (7 tests).
- Red tests: 1 mine; regressions: 0.
- Branch is merged with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Reject inherited validator-registry property names as unknown message types","tdd_next":"acceptance green"}}