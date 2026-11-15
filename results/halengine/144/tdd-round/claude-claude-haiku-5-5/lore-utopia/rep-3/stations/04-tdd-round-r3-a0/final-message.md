The round delivered one facet: `validateMessage` now returns the validated `limit` and `before` on the `list_sessions` data. The commit is pushed and the branch is level with `origin/loop-bench/144`. The merge with `origin/main` was already up to date.

**What changed**
- `src/transport/ws/validation.test.ts`: one new test. It went red first, because the validator dropped both fields.
- `src/transport/ws/validation.ts`: the validator returns `limit`, and a `before` reduced to `sessionId` and `updatedAt`. Two casts remain after the existing checks, since I could not run `tsc` here.
- `src/types/messages.ts`: `ListSessionsMessage` gains optional `limit` and `before` fields. This is an additive change, needed so the returned data type-checks.
- `specs/hal-engine-websocket-protocol/spec.md`: one § 4.3 statement, cited to the new test at `#L50`.
- `.lore/dod.md`: the forwarding facet is ticked. The `listFor` call itself is still the next facet.

**Tests this round**
- I ran only `validation.test.ts`, with the repo's `--experimental-vm-modules` flag. It shows 7 of 7 passing, after the one red run. `npm test` needs that flag, which is why a plain `npx jest` failed to load the file.
- No typecheck, lint or build ran in this pod. Prettier was applied to the changed `src` files.

**CI verdict on the previous push — not fixed this round**
- Eslint `no-duplicate-code` and `prefer-early-return` findings sit in `conversationList.acceptance.test.ts` and `sessionResume.test.ts`. I did not edit the acceptance file, and `.lore/dod.md` puts `sessionResume.test.ts` out of this round's scope. The round brief says to fix all findings, so these stay open and the next round must decide how to handle them.
- The `test` job's red acceptance failures are the list-handler behaviour that the handler facet still has to build.
- Regressions: 0 that I can identify. The eslint duplicate-code findings are caused by the new acceptance file duplicating existing test code, not by a previously passing test going red.

**Unrelated smells noticed, not acted on**
- `lore_query_trace` reports no tests covering `validation.ts`, although `validation.test.ts` exists.
- The `.lore/test-commands.yml` mentions Jest while the round brief's example command uses Vitest. The repo is Jest.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Forward validated limit and before from validateMessage into listFor (validation data)","tdd_next":"Handle list_sessions in messageHandler.ts: call sessionStore.listFor(session.userId, {limit, before}) and answer session_list"}}