# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator().processMessageStream()` exposes the real async-generator rejection entry point. The test throws real values into an active stream using the shipped mock provider, without replacing methods or installing test doubles; this reaches the same catch gate as provider failures.

## Done when these pass

- [ ] **reports non-Error stream rejections once with their cause and preserves the caller rejection** — String, object, and undefined rejections each notify once with an Error preserving the original cause; existing Errors retain identity, and caller rejections retain identity, including undefined.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error rejections only for onError, retaining the original value for rethrow.
- [ ] Keep existing Error-path tests unedited and green; the acceptance test also checks Error identity.
- [ ] Fulfil the linked replacement guarantee in the config-hooks spec and add a consumer-facing CHANGELOG entry.
- [ ] Pass the repository CI checks, including build, tests, typecheck, ESLint and Prettier.

## Out of scope

- beforeSession placement, usage accounting across tool rounds, and failures thrown by onError itself.
- Provider-specific error mapping and changes to the rejection seen by callers.
- Changing Lore descriptor tooling: the current list command emits only id, name, and file; the test carries its spec anchor as a comment and the statement links directly to its declaration.