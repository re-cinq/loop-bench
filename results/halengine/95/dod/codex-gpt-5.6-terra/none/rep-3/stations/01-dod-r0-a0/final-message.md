Added and pushed red acceptance coverage in commit `28075f2`.

- New test: `src/orchestration/chatOrchestratorOnError.acceptance.test.ts`
- Updated hook spec with its validation link.
- Added `.lore/dod.md` using `direct` strategy.
- Branch is mergeable and not ahead of upstream.

Ran:

```sh
node scripts/lore-run-test.mjs 'src/orchestration/chatOrchestratorOnError.acceptance.test.ts::ChatOrchestrator onError rejection normalization calls onError once for every rejection, preserving its cause and the caller rejection'
```

Actual failure:

```text
Expected: "hookCalls": 1, "hookReceivedError": true
Received: "hookCalls": 0, "hookReceivedError": false
"name": "string"
...
"name": "object"
...
"name": "undefined"
```

The caller-facing rejection is already preserved; the red bar specifically proves `onError` is skipped for non-`Error` values.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}