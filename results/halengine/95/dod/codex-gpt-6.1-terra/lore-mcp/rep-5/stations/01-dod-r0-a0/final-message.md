Committed and pushed the **direct** acceptance test and definition of done. The branch is up to date with `origin/main` and its upstream.

The named test failed for the reported reason: the caller received the string rejection, but `onError` was not called.

```text
Expected length: 1
Received length: 0
Received array:  []

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
```

The test also covers object and `undefined` rejections and preservation of an existing `Error` instance.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}