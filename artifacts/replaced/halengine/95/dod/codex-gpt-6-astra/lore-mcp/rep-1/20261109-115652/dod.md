# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` accepts an `AIProvider` and exposes `processMessage`. The acceptance test supplies a rejecting provider implementation and records the installed hook's actual arguments through that public path.

## Done when these pass

- [ ] **reports non-Error provider rejections once with their cause and preserves the caller rejection** — Covers strings, plain objects, and `undefined`; requires exactly one hook call with an `Error`, identity-preserved `cause`, and an unchanged rejection at the caller.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the non-Error exclusion and wrap only non-Error values with the original value as `cause`; keep the original rethrow.
- [ ] Turn the acceptance test green while leaving existing Error-path tests unedited and passing.
- [ ] Keep the spec's linked rejection guarantee and add a CHANGELOG entry explaining the newly delivered hook calls to existing consumers.
- [ ] Pass the repository's build, tests, typecheck, eslint, and formatting checks in CI.

## Out of scope

- `beforeSession` placement and usage accounting across tool rounds.
- Changing provider errors, caller rejection values, or the public `onError` signature.