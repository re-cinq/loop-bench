# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — The public orchestrator methods share a catch block for provider and lifecycle failures. Real rejecting lifecycle hooks exercise that catch without provider doubles or network access; the installed Vertex provider is never reached.

## Done when these pass

- [ ] **reports every rejection as an Error without changing the caller rejection** — String, object and undefined rejections each notify once with an Error preserving the exact cause; existing Errors retain identity, and both public methods preserve the caller rejection.
      `src/orchestration/onError.acceptance.test.ts`

## Facets

- [ ] Remove the Error-only notification gate and wrap non-Errors with their original cause, retaining the original thrown value.
- [ ] Keep the existing onError tests unedited and passing; retain Error identity.
- [ ] Keep the linked replacement spec guarantee and add a consumer-facing CHANGELOG entry explaining the expanded hook delivery.
- [ ] Pass the repository CI build, tests, typecheck, eslint and Prettier checks.

## Out of scope

- Provider-specific error normalization, beforeSession placement, and tool-round usage accounting.
- Changes to test discovery tooling: the current Lore Jest descriptor emits only id, name and file; the spec anchor is stamped in the acceptance test and linked from the spec.