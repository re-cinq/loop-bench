Added and pushed red acceptance coverage in commit `fa4d74d`.

Focused test run:

```text
Expected onErrorCallCount: 1
Received onErrorCallCount: 0
```

It fails for string, plain-object, and `undefined` provider rejections while confirming the caller still receives each original value unchanged. The spec now states the intended guarantee and links to the new test; `.lore/dod.md` records the direct strategy.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}