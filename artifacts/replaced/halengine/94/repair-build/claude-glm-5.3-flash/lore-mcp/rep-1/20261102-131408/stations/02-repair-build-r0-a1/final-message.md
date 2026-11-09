The branch moved past the sha CI judged. Per the protocol for that case:

- CI's verdict was for `c3cd08a` ("fix(orchestrator): run onError and afterSession when beforeSession throws"), which had both reported failures — the typecheck error on `PromptBuilderConfig` and the eslint `re-lint/max-expects` violation in `chatOrchestrator.beforeSession.acceptance.test.ts`.
- HEAD is now `8a6e3d8` ("test(orchestrator): fix prompt builder config and single-expect rule"), pushed after that judgment with no `[skip ci]`. Its diff addresses exactly the two named findings: it replaces the `PromptBuilder` construction that passed a nonexistent `baseSystemPrompt` key with `new PromptBuilder({identity: 'You are HAL.'})`, and collapses the three `expect` calls into a single `expect({...}).toEqual({...})` (updating the spec's `validated by` line anchor to match the test's new line).

The head has not been judged yet, so there is nothing for me to fix or run here — the wait re-reads CI on `8a6e3d8` and returns the branch only if that build is red too.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"branch moved past c3cd08a; CI re-judges the head"}}