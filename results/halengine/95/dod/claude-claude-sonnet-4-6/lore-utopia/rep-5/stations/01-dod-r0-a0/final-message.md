Pushed and confirmed clean. Here's what landed:

**Three failing acceptance tests** in `src/orchestration/chatOrchestrator.acceptance.test.ts`, each red for the right reason:

```
● calls onError once with an Error wrapping the string as cause, re-throws the original string
  onErrorCallCount: 0 (expected 1), onErrorIsError: false (expected true), onErrorCause: undefined (expected 'provider failure')

● calls onError once with an Error wrapping the plain object as cause, re-throws it unchanged
  onErrorIsError: false (expected true), onErrorCause: undefined (expected the object)

● calls onError once with an Error wrapping undefined as cause, re-throws undefined
  onErrorIsError: false (expected true)
```

The `instanceof Error` gate at `chatOrchestrator.ts:L150` is the exact cause in all three cases — `onError` is never called for non-Error rejections. The caller already gets the original value back unchanged (that half already works).

The spec's "Measured semantics — out of scope" flaw note has been replaced with three cited guarantee statements. Spec coverage stays at 11/11 linked, `Shipped` status unchanged.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}