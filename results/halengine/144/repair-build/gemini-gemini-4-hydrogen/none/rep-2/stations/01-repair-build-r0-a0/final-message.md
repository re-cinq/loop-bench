Wired `list_sessions` handling into `src/transport/ws/messageHandler.ts` (`handleListSessions`, `toSummaryFrame`), `src/transport/ws/sender.ts` (`sendSessionList`), and `src/transport/createServer.ts`, fixed the 8 ESLint errors across `src/transport/conversationList.acceptance.test.ts` and `src/transport/ws/validation.test.ts`, and repointed `specs/hal-engine-conversation-list/spec.md` anchors.

Verified locally with:
- `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/transport/conversationList.acceptance.test.ts src/transport/ws/validation.test.ts src/transport/ws/messageHandler.test.ts src/transport/createServer.test.ts src/transport/ws/sessionSave.test.ts src/transport/ws/beforeToolCall.test.ts` (6 suites, 82 tests passed)
- `npx prettier --write` on changed `.ts` files, `npm run spec:names`, `npm run check:spec-links`, `npm run check:spec-status`, `npm run docs:check`, `npm run check:regions`
- Pushed `c8cb2ea` to `origin/loop-bench/144` (`origin/main` already up to date).

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"wired list_sessions handling in messageHandler/createServer and resolved duplicate-code, early-return, and flag-param lint errors in the transport tests"}}