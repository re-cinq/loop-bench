Done. Branch pushed and up to date with `origin/loop-bench/95` (its base is current `origin/main`, so no merge was needed).

## Triage: `direct`

The seam already exists — `createChatOrchestrator` is the real entry point, and a provider whose `sendMessage` rejects with a raw value drives the `catch` gate in `processMessageStream` (`src/orchestration/chatOrchestrator.ts:150`) today. No production code written.

**`specs/hal-engine-config-hooks/spec.md`** — the spec this ticket belongs to — had its recorded-flaw statement (the `instanceof Error` gate noted by HALEngine#83 as owned by no issue) replaced by the new guarantee, citing both tests. The repo's own gates verify it: `check-spec-anchor-names` (601→603 citations, all naming their test), `check:spec-links`, `check:spec-status` and `repoint-spec-anchors --check origin/main` all pass.

## Acceptance tests — `src/orchestration/chatOrchestrator.onError.acceptance.test.ts` (new file)

1. **RED** — string, plain-object and `undefined` rejections: `onError` called once with an `Error` whose `cause` is the original value, caller receives the original rejection. Fails today exactly as the ticket claims — `onError` bypassed while the rejection still propagates:
   ```
   ● onError for a rejection that is not an Error › calls onError once with an Error carrying the rejected value as its cause, and still rejects the caller with that value
       Object {
         "callerReceivedOriginal": true,
     -   "causeIsOriginal": true,
     -   "hookReceivedAnError": true,
     -   "onErrorCalls": 1,
     +   "causeIsOriginal": false,
     +   "hookReceivedAnError": false,
     +   "onErrorCalls": 0,
       }
   ```
2. **GREEN pin, must stay green unedited** — an `AIError` rejection reaches `onError` as the same instance (`Object.is` identity, no wrapper) and is what the caller receives. No existing test pins instance identity, so this pins the ticket's third criterion.

Run with: `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestrator.onError.acceptance.test.ts` → `Tests: 1 failed, 1 passed, 2 total`. Prettier run over the changed `.ts` file (unchanged). `.lore/dod.md` records the claim, strategy, tests, remaining facets (the `catch` fix, CHANGELOG entry, CI gates) and out-of-scope lines.

Finding on the way, not a substitute subject: the ticket's criterion 3 says the same-instance property is "pinned by the existing tests remaining unedited", but the existing tests assert only `error.message` — a wrapper with the same message would pass them all. Test 2 closes that gap.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}