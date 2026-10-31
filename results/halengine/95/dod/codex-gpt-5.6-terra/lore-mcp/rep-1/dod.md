# Definition of Done

> The orchestrator's `catch` gates `onError` on `error instanceof Error`.

**Strategy: `direct`** — `createChatOrchestrator(...).processMessage()` drives provider rejections through the existing catch boundary. The acceptance test uses that public orchestrator entry point with real rejection values.

## Done when these pass

- [ ] **calls onError once with an Error that preserves each original rejection as its cause** — a string, plain object, and `undefined` rejection each call the hook once with a wrapped `Error`, while the caller receives the original value unchanged.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize every caught non-`Error` rejection before invoking `onError`, preserving the original value as `cause` and rethrowing it unchanged.
- [ ] Replace the recorded-flaw statement in the hooks spec with the guarantee and add the consumer-facing changelog note.

## Out of scope

- `beforeSession` escaping the turn boundary and usage accounting across tool rounds.