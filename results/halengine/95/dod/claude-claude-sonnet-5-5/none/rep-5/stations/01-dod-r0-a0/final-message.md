I wrote one acceptance test for #95. It is red now, and I committed and pushed it; the branch is up to date with `origin/main` and not ahead of its upstream.

The strategy is `direct`. A provider that throws a non-`Error` drives the `catch` through `processMessage` today, so no new seam is needed.

The test, `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`, runs three cases with `it.each`:
- **Rejections:** a string, a plain object, and `undefined`.
- **Expected `onError` behaviour:** called once with an `Error` whose `cause` is the raw rejection.
- **Expected caller behaviour:** the caller still receives the original value.

I ran it with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. Output for the string and plain-object cases is quoted here; I didn't read the `undefined` case's output:

```
● wraps a string in an Error with the original as cause and rethrows the original
    "caught": { "error": "plain string", "resolved": false },
-   "cause": "plain string",
-   "isError": true,
-   "onErrorCalls": 1,
+   "cause": undefined,
+   "isError": false,
+   "onErrorCalls": 0,
```

The plain-object case fails the same way. `onError` is never called, which is the ticket's claim, while the caller already gets the original value.

I did not add a test for the `Error` pass-through criterion. It already passes today, so the existing `chatOrchestrator.test.ts`, left unedited, covers it. The DoD names that file as a must-stay-green item.

I did not touch `specs/hal-engine-config-hooks/spec.md` or the CHANGELOG. Replacing the recorded-flaw line with a `validated by` link would assert behaviour that doesn't exist yet. The DoD lists both as facets for the implementing round. The repo has no `scripts/spec-links/reanchor.mjs`, so that round must check the `#Lnn` links by hand.

The DoD is in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}