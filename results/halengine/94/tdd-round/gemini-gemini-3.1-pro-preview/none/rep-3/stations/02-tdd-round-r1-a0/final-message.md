I have fixed the CI failures reported from the last push, formatted the files, and pushed the branch. No new tests were needed for this round, as we were addressing the typecheck and eslint errors, and I ran no tests locally per instructions.

- The type error in `chatOrchestrator.beforeSession.acceptance.test.ts` was fixed by replacing `baseSystemPrompt` and other fields with `identity`, to match `PromptBuilderConfig`.
- The `max-expects` lint error was resolved by capturing the rejection error message in a `try/catch` and asserting it together with the other states in a single `expect({...}).toEqual({...})`.
- The missing spec link lint error was solved by appending a second inline spec link to the existing `beforeSession` behavior rule in `specs/hal-engine-config-hooks/spec.md` pointing to the unit test on line 116.
- The `beforeSession` acceptance test spec link line number was updated to match its new line 32 in the modified acceptance test file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fixed CI failures","tdd_next":"acceptance green"}}