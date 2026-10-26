# Definition of Done

> Call `onError` for every rejection. Whatever is not already an `Error` gets wrapped in one, preserving the original as the `cause`, so a hook typed against `Error` keeps compiling and a hook that wants the raw value can still reach it. The re-thrown value at the caller boundary stays exactly what it is today, so nothing downstream changes shape.

**Strategy: `direct`** — `createChatOrchestrator().processMessage()` is the real entry point and accepts a provider plus `onError` hook directly, so the rejection behavior can be observed without a double.

## Done when these pass

- [ ] **calls onError for every rejection and preserves the caller rejection** — a string, plain object, `undefined`, and an existing `Error` each call `onError` once; non-Errors arrive wrapped with the original as `cause`, an existing `Error` arrives unchanged, and the caller receives the original value
      `src/orchestration/onErrorRejection.acceptance.test.ts`

## Facets

- [ ] Exercise non-`Error` provider rejections through the orchestrator's public processing entry point.
- [ ] Assert wrapping, `cause`, Error identity, single invocation, and unchanged propagation in one parameterized acceptance test.
- [ ] Replace the measured-flaw wording in the config-hooks spec and document the consumer-facing change in the changelog during implementation.

## Out of scope

- `beforeSession` escaping the `try` and usage accounting across tool rounds.
- Changes to any provider, transport, or error shape other than the `onError` observation described above.