Added and pushed one direct acceptance test covering string, object, and `undefined` rejections, plus `.lore/dod.md` and spec traceability.

The test fails correctly:

```text
Expected onErrorCalls: 1
Received onErrorCalls: 0
ReceivedError: undefined
```

Commit: `1980677`  
Branch is pushed and up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}