Added one direct acceptance test covering string, plain object, and `undefined` rejections. It exercises the real provider and orchestrator seam. The spec now states the intended guarantee and links to the test; `.lore/dod.md` records the triage and remaining changelog facet.

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

It fails for the reported behavior. The run reaches all three rejection values; for each, `onError` was called zero times while the caller received the original value:

```text
Expected: onErrorCalls: 1, hookedErrorIsError: true
Received: onErrorCalls: 0, hookedErrorIsError: false
```

Committed and pushed as `85dca34` and `8a62532`. The branch is clean, up to date with its upstream, and `origin/main` was already merged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}