# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage` is the real entry point and a provider that throws a non-Error exercises the `catch` today; no seam is missing.

## Done when these pass

- [ ] **calls onError once with an Error whose cause is the rejection (string, plain object, undefined), and the caller receives the original rejection** — onError fires once with an `Error` carrying the raw value as `cause`; the caller's rejection is unchanged.
  `src/orchestration/chatOrchestrator.onError.acceptance.test.ts`
- [ ] **Existing chatOrchestrator tests stay green and unedited** — an `Error` rejection still reaches `onError` as the same instance.
  `src/orchestration/chatOrchestrator.test.ts`

## Facets

- [ ] Wrap non-Error rejections in `new Error(..., {cause})` in the `catch` and drop the `instanceof Error` gate; rethrow the original.
- [ ] Replace the recorded-flaw line in `specs/hal-engine-config-hooks/spec.md` with the new guarantee, linked to the acceptance test.
- [ ] Add a CHANGELOG entry for existing consumers.

## Out of scope

- `beforeSession` escaping the `try`, and usage accounting across tool rounds (HALEngine#93).