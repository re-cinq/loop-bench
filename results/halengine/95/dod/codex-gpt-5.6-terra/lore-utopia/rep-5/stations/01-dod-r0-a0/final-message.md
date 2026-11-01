Defined and pushed the red acceptance contract in commit `b73828e`.

- Added [chatOrchestrator.acceptance.test.ts](/var/tmp/loop-bench/runs/0d51ee7c893c/workspace/target/src/orchestration/chatOrchestrator.acceptance.test.ts:25).
- Added `.lore/dod.md` with direct strategy.
- Updated the config-hooks spec guarantee and traceability link.
- Formatted touched files and re-anchored spec links.
- Branch is pushed and synchronized with `origin/loop-bench/95`.

Ran only:

```text
npm test -- --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts
```

Actual red-bar failure:

```text
Expected: received: [ObjectContaining { "cause": "provider rejected" }]
Received: received: []

Expected: received: [ObjectContaining { "cause": { "code": "UNAVAILABLE" } }]
Received: received: []

Expected: received: [ObjectContaining { "cause": undefined }]
Received: received: []
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}