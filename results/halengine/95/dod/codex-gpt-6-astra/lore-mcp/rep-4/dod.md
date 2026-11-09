# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The real `createChatOrchestrator` entry point exposes both caller APIs and the `onError` callback. A throwing configuration accessor makes the real Bedrock provider reject before network access; no provider methods or SDK dependencies are replaced.

## Done when these pass

- [ ] **reports every provider rejection once without changing the caller rejection** — Strings, plain objects and `undefined` reach the hook exactly once as `Error` instances with their original cause, while callers retain the exact rejection; existing `Error` instances retain identity. Exercises both buffered and streaming callers.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-`Error` values only for `onError`, preserving the original value as an own `cause` property even for `undefined`.
- [ ] Preserve the original thrown value at both caller boundaries and pass existing `Error` instances through unchanged; leave existing tests unedited.
- [ ] Implement the linked guarantee in `specs/hal-engine-config-hooks/spec.md` and add a consumer-facing CHANGELOG entry explaining the newly reported failures.
- [ ] Pass CI's build, tests, typecheck, ESLint and Prettier checks. Locally run only the named acceptance file.

## Out of scope

- Moving `beforeSession`, usage accounting across tool rounds, and changes to provider error mapping.
- Behaviour when `onError` itself throws or cleanup fails.
- Changing Lore descriptor tooling: the current Jest list command emits only `id`, `name` and `file`; the test carries a spec anchor comment and the spec carries the named validation link.