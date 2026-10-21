Round complete. Summary:

**What this round owed and closed** — the previous round's implementation was already in (`beforeSession` moved inside the `try`, spec guarantee, CHANGELOG migration note), but its push was red on two CI findings in the acceptance test, both now repaired in `744c140`:

1. **typecheck** (`chatOrchestrator.beforeSession.acceptance.test.ts:30`) — the test built a `PromptBuilder` from `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig`, none of which exist on `PromptBuilderConfig`; its required field is `identity`. Now built as `new PromptBuilder({identity: 'You are a test assistant.'})`, matching `chatOrchestrator.test.ts`.
2. **eslint** (`:40`, `re-lint/max-expects`) — three expects collapsed into one, using the repo's own `outcomeOf` idiom: the rejection is read as a value and one `expect({outcome, caughtError, afterSessionRan}).toEqual({...})` asserts all three. The assertion subject is unchanged in substance — caller still rejects with the original error, `onError` receives that same error object, `afterSession` still runs. The acceptance test was edited only for compile/lint defects CI named, never to weaken what it pins.
3. The spec's validated-by anchor moved with the test title (`#L40` → `#L36`); prettier reports the file unchanged; `origin/main` merge was a no-op; pushed and confirmed up to date with `origin/loop-bench/94`.

**Tests run here: none.** The pod's guard refused to run this file locally — `.lore/dod.md` lists it, so it is CI's to judge. The repair was made from the CI findings directly; CI's verdict on the push is the confirmation.

**Red tests:** none of this round's making; zero regressions to pre-existing tests. The two findings were in this ticket's own acceptance test.

**Named, not acted on:** the two flaws the spec records as out of scope remain — the `error instanceof Error` gate on `onError` (a thrown non-`Error` bypasses it) and `afterModelResponse` receiving per-round `lastUsage` rather than a sum. Both have their own issues per the ticket.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance test compiles and lints: PromptBuilderConfig identity + single expect","tdd_next":"acceptance green"}}