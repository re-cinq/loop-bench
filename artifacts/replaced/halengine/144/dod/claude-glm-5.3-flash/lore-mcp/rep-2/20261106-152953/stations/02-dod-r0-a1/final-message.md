The work this ticket owed is already committed and pushed on the branch; this session verified it end to end. Summary:

## Ticket #144 — conversation list over the WebSocket

**Strategy: `direct`** (recorded in `.lore/dod.md`) — the seam already exists: a real `createServer` upgrades a real socket today, so each test drives the real entry point. All seven fail on behaviour, not on a broken import: the engine answers `list_conversations` with `INVALID_MESSAGE` because the frame simply does not exist — which is the ticket's claim, that a **client** gets nothing from `store.listFor`.

**Test file:** `src/transport/ws/conversationList.acceptance.test.ts` (new, 7 tests). Run command, naming the file:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/transport/ws/conversationList.acceptance.test.ts
```

**Failure output (7 failed, 7 total):**

- `answers list_conversations with one conversation_list of the newest-first summaries as ISO strings…` — expected `[{"type":"conversation_list","conversations":[…3 rows…]}]`, received `[{"code":"INVALID_MESSAGE","message":"Unknown message type: list_conversations","type":"error"}]`
- `answers with the list of the user the connection authenticated, never one a frame names` — received `askedFor: [], listed: []`; the store is never called at all
- `validates the frame whether or not the feature is on…` — plain `{type: 'list_conversations'}` refused as unknown type
- `answers UNSUPPORTED, and never an empty list, when the feature is off or the store cannot answer` — all three cases answer `INVALID_MESSAGE` instead of `UNSUPPORTED`
- `answers a failing store with SERVER_ERROR, keeps the socket open and leaks nothing of the store` — received `code: "INVALID_MESSAGE"`, `logged: false`
- `answers a list_conversations sent while a turn streams…` — `answeredWhileStreaming: false`, order shows `error` where `conversation_list` belongs
- `rejoins, with nothing new, the conversation a client picked from its list` — `Received array: []`, no list to pick an id from

**Traceability:** §4.3 `list_conversations` and §5.9 `conversation_list` added to `specs/hal-engine-websocket-protocol/spec.md` with the authorisation/retention rules, each statement carrying `([validated by: …](…conversationList.acceptance.test.ts#Lnn))`. All 13 `#Lnn` anchors hand-verified against the test titles (239, 269, 287, 317, 342, 372, 416 — each lands on its `it(`), no `reanchor.mjs` exists in this repo. `npm run check:spec-links` → `misplaced: 0 … (1929 statements scanned)`, `check:spec-status` → `0 findings`, `spec:names` → `803 citation(s) name the test they point at`. `Status` untouched.

**Delivery state:** branch `loop-bench/144` clean and in sync with `origin/loop-bench/144`; `origin/main` (2926558) is a direct ancestor, so no merge drift. Prettier: the only `.ts` file changed passes `--check`; the two markdown files the checker flags were already outside the repo's formatter scope before this commit (`prettier:check` covers only `{src,scripts,smoke}/**/*.ts`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}