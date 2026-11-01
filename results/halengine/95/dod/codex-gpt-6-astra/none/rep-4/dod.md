# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — `createChatOrchestrator` exposes the shared catch through both public message methods. A real installed lifecycle callback rejects with each raw value, avoiding provider doubles; the built-in providers do not expose configurable raw rejections. The test also checks existing Error identity, leaving the existing tests unedited.

## Done when these pass

- [ ] **reports every rejection once as an Error while preserving the original caller rejection** — strings, plain objects and undefined invoke the hook once with an Error preserving the raw cause; Errors retain identity, and both caller APIs retain the original rejection.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Normalize non-Error values only for the onError argument in the common catch, preserving the original throw and existing Error instances.
- [ ] Keep the new spec guarantee and add a CHANGELOG entry describing newly reported failures and unchanged caller rejection values.
- [ ] Pass the acceptance test and retain the unedited existing onError tests; CI runs the full build, tests, typecheck, lint and formatting checks.

## Out of scope

- beforeSession placement and usage accounting across tool rounds.
- Error message wording, hook failures and provider-specific error mapping.
- Lore descriptor infrastructure: the current list command emits only id/name/file and has no spec-field stamping mechanism; the test carries an explicit spec anchor and the spec links its declaration.