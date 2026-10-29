I stopped without editing or running tests. The acceptance test constructs `PromptBuilder` with `baseSystemPrompt`, but [PromptBuilderConfig](/var/tmp/loop-bench/runs/7178a5d9b80e/workspace/target/src/infrastructure/builders/promptBuilder.ts:1) requires `identity` and has no `baseSystemPrompt` field. CI also reports a lint error in that acceptance test. Your instructions say to stop when an acceptance test is wrong and not edit it to make it pass.

No round was committed or pushed. CI reported no red test results, so I cannot classify any as regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test uses an invalid PromptBuilderConfig; the instructions prohibit editing an incorrect acceptance test."}}