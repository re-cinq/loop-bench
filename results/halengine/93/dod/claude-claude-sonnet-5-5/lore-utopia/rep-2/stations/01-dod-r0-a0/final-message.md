Two acceptance tests are committed and pushed, and both fail for the reason the ticket gives. The branch is level with its upstream after merging `origin/main`.

**Strategy: `direct`.** `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is already a real entry point, so no new seam was needed. The tests are in `src/orchestration/usageAcrossRounds.acceptance.test.ts`.

I picked the "accumulate and pass the sum, keeping one `usage` argument" option, so the tests pin that shape. I wrote the rejected per-round-breakdown option into `.lore/dod.md` for the implementer to record.

I ran the file with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/usageAcrossRounds.acceptance.test.ts`. Without that flag the suite won't load under ESM. Result: `Tests: 2 failed, 2 total`.

- **Sum across two tool rounds:** three rounds report 100/10/110, 200/20/220 and 300/30/330. The test expects 600/60/660, and the hook received `{inputTokens: 300, outputTokens: 30, totalTokens: 330}`, which is the last round only.
- **Rounds that report no usage:** the middle round reports nothing. The test expects 400/40/440, and the hook again received 300/30/330, so the first round was dropped.

I also changed the under-counting line in `specs/hal-engine-config-hooks/spec.md` to describe the summed behaviour, with a `validated by` link to the first test. `.lore/dod.md` quotes the ticket's claim and lists the facets: sum the usage in the orchestrator, document the type, and add a CHANGELOG entry with a MINOR bump.

Three acceptance criteria have no new test:
- **No-tool turn:** the existing tests that already cover it stay unedited.
- **Type clarity:** this isn't observable as behaviour.
- **Spec and CHANGELOG wording:** the review judges it.

A turn where no round reports usage still passes `undefined`. That already holds today, so it has no red test.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}