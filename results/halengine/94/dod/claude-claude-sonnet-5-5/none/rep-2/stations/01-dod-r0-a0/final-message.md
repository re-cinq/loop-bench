I wrote two acceptance tests for #94. Both fail now, and the commit is pushed. The branch is up to date with `origin/main` and not ahead of its upstream.

**Strategy: `direct`.** `createHalEngine(...).orchestrator.processMessage` already takes hooks, so the tests call it with a throwing `beforeSession` and no doubles.

The tests are in `src/beforeSessionFailure.acceptance.test.ts`:
1. **"still rejects the caller with the thrown error and fires onError with (session, error)"** fails at `expect(errors).toEqual([{session, error: boom}])`. The expected array holds one entry and the received array is empty (`+ Array []`). The rejection assertion before it already passes, which matches the ticket's "unchanged from today" criterion.
2. **"fires afterSession, so what beforeSession allocated can be released"** fails at `expect(after).toEqual([session])`. Again the received array is empty (`+ Array []`).

Both failures are the ticket's claim itself: neither `onError` nor `afterSession` runs when `beforeSession` throws.

I ran the file with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/beforeSessionFailure.acceptance.test.ts`. Plain `npx jest` can't load the ESM suite.

`.lore/dod.md` opens with the ticket's central claim quoted verbatim. I also added a statement to `specs/hal-engine-config-hooks/spec.md` with a validated-by link to the second test. `scripts/spec-links/reanchor.mjs` doesn't exist in this repo, so I checked that line number by hand. The spec has no ordinal anchors, so the tests carry only a `// spec: …#beforesession-failure` comment.

Not tested, and left to the implementation round:
- The ticket's decision on whether `afterSession` can tell the session never started. The tests only pin that `afterSession` fires.
- The CHANGELOG entry.
- Replacing the recorded-flaw line in the spec.

These are listed as facets in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}