The docs facets are closed and pushed, but CI will stay red until someone corrects the acceptance test, which I did not edit.

**CI findings from the round brief**
- **changelog:** fixed. Added an Unreleased entry in `CHANGELOG.md` for existing consumers, with a migration note.
- **eslint `require-spec-link` at `chatOrchestrator.test.ts:284`:** fixed. The new spec section links that test, in the spec's existing `([validated by: …](…#L284))` form.
- **typecheck and eslint `max-expects` in `chatOrchestrator.beforeSession.acceptance.test.ts`:** not fixed. Line 30 passes `baseSystemPrompt`, `systemPromptSuffix` and `contextConfig` to `PromptBuilder`, but its config type is `PromptBuilderConfig { identity, domainContext?, responseGuidelines?, toolPreamble? }`. Line 40 has three `expect` calls against a limit of one. The acceptance test is wrong, and the rules forbid editing it, so the round stops here. I recorded this as an open facet in `.lore/dod.md`.

**Spec decision**
- `beforeSession` now sits under a new "A throwing `beforeSession`" section in `specs/hal-engine-config-hooks/spec.md`, and the old out-of-scope bullet is gone.
- `afterSession` runs after a failed `beforeSession`, because it is where a deployer releases what `beforeSession` allocated.
- A hook can assume that `beforeSession` was entered and threw, and that no input was rewritten, no model was called and no tool ran. It cannot assume the turn started, so a deployer who needs that must track it in its own state.
- The Status row stays `Shipped`.

**Tests**
- I wrote no test this round. The facets are documentation, and a test that reads the spec or changelog text is forbidden.
- No tests were run in this pod.
- Red tests I wrote: 0. Regressions: none known. CI's Test step was not in the failure list.

**Other notes**
- The lore MCP server failed to connect, so I could not run `lore-query-trace` or `lore_get_ci_failures`. I used the round brief instead.
- Pushed commit `1c79b92`. The branch is level with `origin/loop-bench/94`, and origin/main had no new commits to merge.
- Unrelated smell, not touched: the `instanceof Error` gate on `onError` is still documented as a measured-semantics bullet. It is out of scope per the ticket.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"chatOrchestrator.beforeSession.acceptance.test.ts is wrong: line 30 passes baseSystemPrompt/systemPromptSuffix/contextConfig to PromptBuilder (type PromptBuilderConfig takes identity), and line 40 has 3 expects against re-lint/max-expects (max 1); the acceptance test must be corrected by its owner, not by the TDD loop"}}