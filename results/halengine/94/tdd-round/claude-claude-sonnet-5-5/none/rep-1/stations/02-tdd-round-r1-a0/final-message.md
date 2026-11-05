I stopped without changing anything this round. The two red CI checks come from the acceptance test file, and I'm not allowed to edit that file.

**Typecheck.** `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts:30` builds `new PromptBuilder({baseSystemPrompt, systemPromptSuffix, contextConfig})`. `PromptBuilderConfig` in `src/infrastructure/builders/promptBuilder.ts` only has `identity`, `domainContext`, `responseGuidelines` and `toolPreamble`. The test passes properties that don't exist, so this is TS2353.

**Eslint.** The one test at line 40 has three `expect` calls, and `re-lint/max-expects` allows one.

Neither failure comes from the source change. The previous round's fix moves `beforeSession` inside the `try` and adds the CHANGELOG entry, and CI doesn't report it as wrong. I couldn't confirm the behaviour here, because I'm not allowed to run the acceptance test.

Fixing this in source would mean widening `PromptBuilderConfig` with fields it shouldn't have, which isn't a sound fix. The proper fix is in the test:
- Build `PromptBuilder` with `{identity: 'You are HAL.'}`.
- Merge the three expects into one `toEqual`/`toMatchObject`, or split them into separate tests.

Someone with authority over the acceptance test needs to make that change before the build can go green. Nothing was committed or pushed. No tests of mine were red and no regressions were caused.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test chatOrchestrator.beforeSession.acceptance.test.ts is itself invalid: it passes non-existent PromptBuilderConfig props (typecheck TS2353) and has 3 expects (eslint max-expects); I may not edit it, and no source change can fix it"}}