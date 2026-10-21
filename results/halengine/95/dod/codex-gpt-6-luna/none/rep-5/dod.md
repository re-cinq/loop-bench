# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts a provider whose stream can reject with any JavaScript value. The test observes both the hook argument and the rejection at the caller boundary.

## Done when these pass

- [ ] **calls onError and preserves the caller rejection for string, plain object, and undefined** — each non-Error rejection calls the hook once with an Error caused by the original value, while the caller receives that exact value
      `src/orchestration/onErrorNonError.acceptance.test.ts`

## Facets

- [ ] Verify non-Error provider rejections reach onError as caused Errors without changing the caller rejection.
- [ ] Replace the measured-flaw statement in the config-hooks spec with the guarantee.

## Out of scope

- Rejections that are already Errors; existing tests pin their identity.
- `beforeSession` escaping the try and usage accounting across tool rounds.
- Changelog and implementation changes, which belong to the implementation round.