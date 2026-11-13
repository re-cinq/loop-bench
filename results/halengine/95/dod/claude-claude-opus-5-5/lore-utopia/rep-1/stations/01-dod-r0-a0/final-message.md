I wrote one acceptance test file for #95. It's red against the current code, committed and pushed, and the branch is up to date with `origin/main`.

**Strategy: `direct`.** The test calls `createChatOrchestrator(...).processMessage` with a real provider whose stream throws an arbitrary value, so it goes straight into the `instanceof Error` gate at `src/orchestration/chatOrchestrator.ts:150`. No mocks needed.

**Test:** `src/orchestration/chatOrchestrator.acceptance.test.ts` runs one check three times, with a string, a plain object and `undefined`. Each time it requires that `onError` fires once with an `Error` that carries its own `cause` equal to the rejected value, and that the caller still receives the original value (compared with `toBe`).

**Red bar**, from `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.acceptance.test.ts`:
```
● ... › calls onError once with an Error whose cause is a string, and the caller still receives the original rejection
      Object {
        "callerSaw": "provider exploded",
    -   "cause": "provider exploded",
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "cause": undefined,
    +   "isError": false,
    +   "onErrorCalls": 0,

● ... › ... whose cause is undefined, ...
        "callerSaw": undefined,
    -   "carriesCause": true,
    +   "carriesCause": false,
        "cause": undefined,
    -   "isError": true,
    -   "onErrorCalls": 1,
    +   "isError": false,
    +   "onErrorCalls": 0,
```
The plain-object case fails the same way. In all three, the caller already gets the original value and only `onError` is missing, which is exactly what the ticket reports.

**Left for the implementation round** (listed as facets in `.lore/dod.md`):
- **Spec line:** I didn't edit `specs/hal-engine-config-hooks/spec.md`. Its "Measured semantics" line describes today's broken behaviour, and the ticket says to replace it with the new guarantee. I left that for the fix itself, along with the validated-by link to `chatOrchestrator.acceptance.test.ts#L31`.
- **CHANGELOG** entry describing the change for existing consumers.
- **Same-instance criterion:** a rejection that is already an `Error` must reach `onError` unwrapped. The ticket says the existing tests in `chatOrchestrator.test.ts` pin this, and it passes today, so it isn't in the new file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}