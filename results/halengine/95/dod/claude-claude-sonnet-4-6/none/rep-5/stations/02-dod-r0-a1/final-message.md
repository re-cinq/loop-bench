The acceptance tests, `.lore/dod.md`, and spec updates are already committed in `d65aac1` on `loop-bench/95`. The branch is up to date with its remote. Everything is in place.

The three tests all fail for the right reason — `onErrorCallCount` is 0 (expected 1), `hookErrorIsError` is false (expected true), `hookErrorCause` is undefined (expected the original value) — because the current code gates `onError` on `error instanceof Error` and skips it entirely when the rejection is a string, plain object, or `undefined`.

**Actual failure output (all 3 tests):**
```
Tests: 3 failed, 3 total

onError for non-Error rejections › calls onError with wrapped Error when provider rejects with a string
  Expected: { onErrorCallCount: 1, hookErrorIsError: true, hookErrorCause: 'provider-string-rejection', ... }
  Received: { onErrorCallCount: 0, hookErrorIsError: false, hookErrorCause: undefined, ... }

onError for non-Error rejections › calls onError with wrapped Error when provider rejects with a plain object
  Expected: { onErrorCallCount: 1, hookErrorIsError: true, hookErrorCause: { code: 'PROVIDER_FAIL' }, ... }
  Received: { onErrorCallCount: 0, hookErrorIsError: false, hookErrorCause: undefined, ... }

onError for non-Error rejections › calls onError with wrapped Error when provider rejects with undefined
  Expected: { onErrorCallCount: 1, hookErrorIsError: true, ... }
  Received: { onErrorCallCount: 0, hookErrorIsError: false, ... }
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}