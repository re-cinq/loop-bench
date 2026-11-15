Round 3 is pushed to `loop-bench/144` as `869bd62`. The branch is level with its upstream, and the `origin/main` merge needed no changes.

**Red-green-refactor, one facet: validate the `before` cursor on `list_sessions`**
- **Red:** I added one unit test in `src/transport/ws/validation.test.ts`. It sends an empty `sessionId` and an unparseable `updatedAt`, and expects `INVALID_MESSAGE` naming `before`. It failed because the validator accepted both.
- **Green:** `validateListSessionsMessage` now rejects a `before` that is not a 1–128 character `sessionId` with a parseable `updatedAt`.
- **Refactor:** the 3-way `switch` on `message.type` is now a lookup table. That clears the `prefer-polymorphism` finding at `validation.ts:28`.

The unit test file passes 6/6. I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js <file>`, because plain `npx jest` cannot load the ESM test. No lint or typecheck ran here.

**CI findings from the last verdict**
- Fixed: `validation.test.ts` `require-spec-link` at lines 24 and 30. I added §4.3 `list_sessions` to `specs/hal-engine-websocket-protocol/spec.md`, with citations to those tests and to the new one.
- Not fixed: the `no-duplicate-code` and `prefer-early-return` findings in `src/transport/conversationList.acceptance.test.ts` and `src/transport/sessionResume.test.ts`. The acceptance file is off-limits, and `dod.md` says not to edit `sessionResume.test.ts` this round. The eslint job will stay red until someone decides how to handle those two files.
- The `test` failure at `conversationList.acceptance.test.ts:116` is an acceptance test that is still red, as expected mid-ticket. It is not a regression: none of the verdict's red tests is a test that existed before the branch.

**Other notes**
- Prettier rewrote about 130 lines of the protocol spec when I formatted it. I restored the spec from HEAD and reapplied only the new section.
- I ticked the `before` facet in `.lore/dod.md` and noted the open CI findings under the CI facet.
- The spec's citations point at `validation.test.ts` line numbers, which I checked by hand. `scripts/spec-links/reanchor.mjs` does not exist in this repo, and I did not run `check:spec-links`.
- Not touched, as unrelated: the spec's Status row still reads `In Progress`, and the `forward limit and before into listFor` facet is still open.

Round tally: one red test, written by me this round, now green. No regressions were identified in the last verdict.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate list_sessions before cursor","tdd_next":"forward validated limit and before from validateMessage into listFor"}}