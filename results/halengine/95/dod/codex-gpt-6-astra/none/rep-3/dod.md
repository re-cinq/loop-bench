# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public orchestrator entry points reach the existing catch through an installed lifecycle hook. The acceptance test uses the shipped local provider and real rejecting hooks, without doubles; hook and provider rejections share this catch.

## Done when these pass

- [ ] **reports every rejection once without changing the caller rejection** — String, plain object, and `undefined` rejections call `onError` exactly once with an `Error` carrying the original `cause`; existing Errors keep their identity, and both caller entry points reject with the original value.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the catch's Error-only gate: wrap non-Errors with their original cause for `onError`, preserving the original rethrow and existing Error identity.
- [ ] Keep the existing orchestrator tests unedited, including provider-failure coverage; verify provider string, object, and undefined failures use the same normalization path.
- [ ] Keep the replacement spec guarantee and add a consumer-facing CHANGELOG entry explaining the newly delivered failures and unchanged caller rejection.
- [ ] Pass the repository's CI checks, including the existing tests, build, typecheck, ESLint, and Prettier.

## Out of scope

- Changes to beforeSession placement, usage accounting, provider retry policy, or failures thrown by onError itself.
- Production changes in this acceptance-test commit.
- Changes to Lore's descriptor adapter: it currently emits only id, name, and file; the test carries an explicit spec stamp and the spec links to its declaration.