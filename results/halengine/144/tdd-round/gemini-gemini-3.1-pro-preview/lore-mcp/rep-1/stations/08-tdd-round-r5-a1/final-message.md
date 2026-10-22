I have successfully addressed the CI findings from the previous push.

1. I removed the duplicate code error `re-lint/no-duplicate-code` in `src/transport/ws/messageHandler.ts` by removing the `answerUserMessage` function and inlining its logic into `answerInTurn`.
2. I fixed the duplicate code in `src/transport/ws/messageHandler.test.ts` by streamlining the `it('passes limit and before to the store')` test.
3. I fixed the `re-lint/require-spec-link` errors in `src/transport/ws/messageHandler.test.ts` by adding the missing protocol assertions to the specs and linking the tests to `specs/hal-engine-conversation-list/spec.md` and `specs/hal-engine-websocket-protocol/spec.md`.
4. I ran `npm run spec:names:fix` which successfully repointed all 78 spec citations that drifted due to these additions.
5. All local verifications (`npm run eslint`, `npm test`, `npm run spec:names`) now pass successfully.

I pushed the fixes to `origin HEAD` and there were no regressions or new test failures caused by this round's work.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures on eslint, test, and spec-names","tdd_next":"Update example/full-config.ts to include history: {enabled: true} under transport and run npm run docs:fix to regenerate docs/getting-started.md."}}