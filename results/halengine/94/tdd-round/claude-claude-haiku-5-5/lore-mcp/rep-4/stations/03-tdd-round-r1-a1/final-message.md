This round is blocked, and I changed nothing this round.

The branch is pushed at `3c2938d`, up to date with its upstream, and already contains `origin/main`, so there was no merge to do.

**CI's verdict on `df9a22b` named three failures:**

- **typecheck** and **eslint** both point at `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. The file passes config keys that `PromptBuilderConfig` does not declare, omits the required `identity`, and has three `expect` calls against a `max-expects` of 1. The rules say I must not edit acceptance tests, and `.lore/dod.md` already records that this needs a person to correct the file. I did not touch it.
- **changelog** is already fixed in `3c2938d`. The `[Unreleased]` / Changed entry for the `beforeSession` throw is there, with a migration note, and `CHANGELOG.md` differs from `origin/main`. The spec line at `specs/hal-engine-config-hooks/spec.md:17` also states the new guarantee. CI judged `df9a22b`, which predates that commit.

I could not confirm CI's verdict on `3c2938d`. The `lore_get_ci_failures` call returned HTTP 403, and I did not look for another credential.

No tests were run in this pod. Per the brief, the round was a verdict-driven fix, not a new red-green cycle, and the only failing items are in a file I may not edit.

**Red tests:** the two acceptance-test findings are not mine to fix. I did not change any code, so I did not introduce any red test this round. Regressions caused by my code: none known, pending CI on `3c2938d`.

**Unrelated smells, not acted on:** the CHANGELOG entry is very long and carries several unrelated changes in one bullet. The spec line is a single long paragraph. Neither is in scope for this ticket.

To unblock, someone needs to correct the acceptance test so it type-checks against `PromptBuilderConfig` and has at most one `expect`. After that, CI on the next push should verify the changelog fix.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Typecheck and eslint fail on the acceptance test file src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts, which I may not edit; the changelog finding is already fixed in 3c2938d, but CI's verdict on that commit is unavailable (lore API 403)."}}