I committed and pushed one acceptance test file, `src/orchestration/onErrorRejections.acceptance.test.ts`. It fails today for the reason the ticket gives. The strategy is `direct`, and the branch is not ahead of its upstream.

The test drives `processMessageStream` with a provider that throws a string, a plain object, or `undefined`. For each, it expects `onError` to be called once with an `Error` whose `cause` is the original value, and the caller to still receive that original value.

I ran it with `NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/onErrorRejections.acceptance.test.ts`. Plain `npx jest` can't load the ESM test files. All three cases fail the same way, because `onError` is never called:

```
● onError receives every rejection › wraps a string in an Error with the original as cause and rethrows the original
    expect(received).toHaveLength(expected)
    Expected length: 1
    Received length: 0
    Received array:  []
> 44 |     expect(seen).toHaveLength(1);
```

The plain-object and `undefined` cases show the same failure. The test does not pin the case where an `Error` reaches `onError` as the same instance. That stays with the existing `chatOrchestrator.test.ts`, which must stay unedited.

I also wrote `.lore/dod.md`, which opens with the ticket's claim quoted verbatim. I added a "target guarantee" bullet to `specs/hal-engine-config-hooks/spec.md`, linked to the test at `#L37`. The recorded-flaw line is still there, for the implementer to replace. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I checked that anchor by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}