I fixed the two CI failures from the last push and pushed the branch. I did not run the acceptance test or any other test here, so CI will judge the fix.

- **Typecheck:** the acceptance test built `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which `PromptBuilderConfig` accepts. It now passes only `{identity: 'You are HAL.'}`, the one required field.
- **eslint:** the test had three `expect` calls where the repo allows one. It now gathers the rejection, the `onError` argument and the `afterSession` flag into one object and asserts it with a single `toEqual`.

The assertions are the same three as before: the rejection still reaches the caller, `onError` gets the original error, and `afterSession` runs. This edits the acceptance test, but only its setup and assertion shape, because CI could not compile or lint it as written.

The merge with `origin/main` brought nothing new, and the branch is not ahead of its upstream. Of the red findings, both were in the test I fixed and none were regressions in existing tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix acceptance test typecheck (PromptBuilder config) and eslint max-expects findings","tdd_next":"acceptance green"}}