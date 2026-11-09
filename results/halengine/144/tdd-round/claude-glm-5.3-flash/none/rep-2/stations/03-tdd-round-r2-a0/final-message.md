Round complete. Everything landed and the working tree is clean.

## What this round did

CI's verdict on `a54eefd` named three failed jobs: typecheck, eslint, test. Every finding it listed fully is now fixed, committed as `490bde8`, and pushed; the branch is up to date with `origin/main` (no conflicts, nothing unpushed).

**Red tests attributable:** all 8 named findings (1 typecheck + 7 eslint) came from this branch's previous push — this branch's own debt, repaired here. Zero regressions: no test that existed before the branch was named red. The `test` job's specific failure was **truncated** in the round brief (only PASS lines survive), and it is not reproducible in what this pod may run: `validation.test.ts`, `messageHandler.test.ts` and `sessionResume.test.ts` all pass locally (84 tests), `ts-jest` does not diagnose imported files, and every `scripts/` suite is fixture-driven. By elimination the remaining red is the acceptance suite or a coverage floor — CI's next verdict names it, and I did not guess at a fix.

**The repair, file by file:**
- `src/transport/ws/validation.ts` — the TS2322 (`cursorError`'s `string | undefined` flowing into `error: string`) is fixed by guarding a `cursorRefusal` before use; the 3-way `message.type` switch flagged by `prefer-polymorphism` is now a `Map` lookup table (a `Map`, not a plain object, so `{type: 'toString'}` stays an unknown type rather than resolving a prototype method); the vague `data` binding became `listRequest`.
- `src/transport/ws/validation.test.ts` — the table test now makes one `expect`; the removed loop and its `data` binding are gone; the 4-hop `error.replace(...).split(...)[0]` chain is split into two statements. Lines 1–25 and the `it(` line are untouched, so the spec anchors `#L8/#L14/#L20/#L26` still land — confirmed by `node scripts/repoint-spec-anchors.mjs --check`: 0 stale, 0 unresolved, 0 mislabelled. (This repo's reanchor equivalent is `repoint-spec-anchors.mjs`, not `scripts/spec-links/reanchor.mjs`.)
- `src/transport/wsTestSupport.ts` — `hal.wss.clients.size` reads off a local `wss`, dropping the chain to two hops.

**Run here:** `validation.test.ts` (red→green across the repair) plus `messageHandler.test.ts` + `sessionResume.test.ts` to keep the dispatch refactor honest — one early sessionResume run failed once on socket timing and passed on every re-run, including 84/84 in the final combined run. No lint, no typecheck, no build in this pod, per the delivery contract. `.lore/dod.md` records the repair as a closed facet.

**Out-of-scope smells noticed, not acted on:** `handlePing` in `messageHandler.ts:372` sends via raw `ws.send` instead of a `sender.ts` function, unlike every other outgoing frame; the malformed-frame table is now duplicated between `validation.test.ts` and the acceptance suite (under the clone threshold today); `validation.ts`'s `limit` is validated twice (once to refuse, once via `isValidLimit` to forward).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair the red build CI named on a54eefd: TS2322 in validateListSessionsMessage + all 7 lint findings","tdd_next":"facet 5: document list_sessions/session_list in specs/hal-engine-websocket-protocol/spec.md and specs/hal-engine-conversation-list/spec.md (frame tables, authorisation rule, GDPR notes)"}}