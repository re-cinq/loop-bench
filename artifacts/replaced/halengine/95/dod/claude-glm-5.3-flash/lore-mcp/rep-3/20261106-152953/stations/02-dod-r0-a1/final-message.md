Done. The branch is pushed, clean, and current with its base.

## What was on the branch and what I did

A previous round of this ticket had already committed the acceptance test, the spec statement and `.lore/dod.md`, but the test had a defect that would have made it a permanent false red: `observeRejection` never returned `hookReceived`, yet the test asserted on it (`expect(asObject.hookReceived).toBe(thrownObject)`) — unpassable even after the fix, and a `tsc` error (`tsconfig` includes all of `src/**/*`, so CI's `npm run typecheck` would have flagged it). It also contradicted the ticket: a non-`Error` rejection reaches the hook as a *wrapper*, not the raw value. I repaired the test — the observer now returns the received value, the matrix strips it through a `shapeOf` reducer, identity is held by `toBe` on the already-an-`Error` case, and the wrapped shapes pin cause identity through `Object.is`. The spec anchor moved with the `it` declaration (L66 → L76) and both of the repo's anchor validators pass (`check-spec-links.mjs`, `check-spec-anchor-names.mjs`).

## Triage: `direct`

The seam exists: `createChatOrchestrator` takes any `AIProvider`, so the test installs a provider whose `sendMessage` throws a string, a plain object, `undefined`, and an `Error`, and observes `onError` through the real entry point `processMessage`. No doubles. The gate it exposes is `src/orchestration/chatOrchestrator.ts:150`.

## Red bar — `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts`

```
-     "causeIsThrown": true,
-     "hookReceivedIsError": true,
-     "onErrorCalls": 1,
+     "causeIsThrown": false,
+     "hookReceivedIsError": false,
+     "onErrorCalls": 0,
```

(repeated for `asString`, `asObject`, `asUndefined`; `callerGotThrown: true` throughout) — exactly the ticket's claim: `onError` is skipped for every non-`Error` rejection while the caller still sees it. Test suite: 1 failed, 1 total. Ran only this file; CI runs the rest.

## Findings for the implementer

- One test, one file: `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`. Everything it owes is in `.lore/dod.md`; the production facet is only dropping the gate at `src/orchestration/chatOrchestrator.ts:150`, wrapping non-`Error` values in an `Error` with `cause`, rethrowing the original unchanged. Plus the CHANGELOG entry under **Fixed** — that facet is still open.
- The committed red bar was briefly failing for a wrong reason before this commit; `fc914b2` is the honest one. Nothing else on the branch needs touching to go green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}