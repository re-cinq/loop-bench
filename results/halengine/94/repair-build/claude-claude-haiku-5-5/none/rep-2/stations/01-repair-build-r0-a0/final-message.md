Both red checks came from the new acceptance test file, and I've fixed them, pushed, and merged `origin/main` (already up to date, no conflicts). The branch is `19d6242`, in sync with its upstream.

- **typecheck:** `PromptBuilder` was given `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig`, none of which exist on `PromptBuilderConfig`. I changed it to `new PromptBuilder({identity: 'You are HAL.'})`. The test never used the other settings, so I dropped them.
- **eslint:** the test had three `expect` calls against a limit of one. I replaced them with one `expect({rejection, caughtError, afterSessionRan}).toEqual({...})`, where `rejection` is the caught error from `processMessage`. The assertions are the same.

I ran `npm test` scoped to that one file, and it passes (1/1). I ran `prettier --write` on that file, and it was already formatted. I did not run `tsc` or eslint here, per the pod rules, so CI has to judge the typecheck and lint.

The orchestrator fix from `c3cd08a` was already in place: `beforeSession` sits inside the `try`. I did not touch the spec or CHANGELOG, since neither was named in the verdict.

I could not query the lore graph (`lore-query-trace` and `lore_get_ci_failures` are not in this session's tools), so I worked from the round brief alone.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"acceptance test used non-existent PromptBuilderConfig keys (typecheck) and had 3 expects over max-expects (eslint); fixed, scoped test passes locally"}}