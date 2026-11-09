The branch moved past the sha CI judged. Here's the situation:

**CI judged `c3cd08a`** and reported two findings, both in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`:
1. **typecheck** — `baseSystemPrompt` not in `PromptBuilderConfig` (line 30)
2. **eslint** — 3 `expect` calls against `re-lint/max-expects` (max 1) at line 40

**But the branch head is already `c03a8a7`**, pushed and matching `origin/loop-bench/94`, and it fixes exactly those two things — nothing else:
- The test now builds `new PromptBuilder({identity: 'You are HAL.'})`; `PromptBuilderConfig` in `src/infrastructure/builders/promptBuilder.ts:1` declares `identity: string` as its required key, so the TS2353 error is gone.
- The three expects are collapsed into one `expect({outcome, caughtError, afterSessionRan}).toEqual({...})` using a `outcomeOf` rejection-as-value helper, satisfying the max-expects rule.
- The spec anchor it disturbed was repointed from `#L40` to `#L36`, and I confirmed `it('runs onError and afterSession when beforeSession throws'` sits at line 36.

The underlying ticket work — moving `beforeSession` inside the `try`, the spec guarantee, the CHANGELOG note — landed in `c3cd08a` and was not implicated by CI at all.

Since the branch moved after CI's verdict and that commit does not carry `[skip ci]`, CI has not judged the new head yet. I changed nothing and ran nothing; CI re-judges `c03a8a7` and the branch comes back here only if that head is red too.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"branch moved past c3cd08a; CI re-judges the head"}}