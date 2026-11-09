# Definition of Done

> A rejection that is not an `Error` — a thrown string, a plain object, a value from a library that rejects with its own shape — bypasses `onError` entirely while still propagating to the caller.

**Strategy: `direct`** — Both public message entry points run through the same catch. The test installs a real rejecting lifecycle hook after the shipped local provider completes a response, exercising that catch without a fabricated provider, mocks or stubs.

## Done when these pass

- [ ] **reports every non-Error rejection once with its original cause and preserves the caller rejection** — String, object and undefined rejections call the hook once with an Error and an own cause preserving identity, while both caller entry points reject with the original value. An existing Error must reach the hook as the same instance.
      `src/orchestration/chatOrchestrator.acceptance.test.ts`

## Facets

- [ ] Remove the Error-only notification gate and wrap non-Error values with their original cause; preserve the thrown value at the caller boundary.
- [ ] Keep existing Error behavior and existing tests unedited; forward Error instances directly.
- [ ] Verify the updated spec guarantee and add a consumer-facing CHANGELOG entry describing the additional notifications.
- [ ] Pass the repository CI checks, including the existing provider failure tests.

## Out of scope

- Provider adapters changing their rejection shapes; beforeSession placement; usage accounting across tool rounds.
- Changing propagation when onError itself throws.