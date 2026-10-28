# Definition of Done

> `beforeSession` is awaited before the `try` block opens, so a throw from it escapes before the `catch` and `finally` exist. Neither `onError` nor `afterSession` runs.

**Strategy: `direct`** — The real orchestrator exposes promise and streaming entry points with lifecycle hooks. One acceptance test exercises both with the built-in provider and real hooks that allocate and release a resource.

## Done when these pass

- [ ] **reports and cleans up a failed beforeSession before rejecting with the original error** — Both entry points await error reporting and cleanup with the original session/error, release partially acquired resources, skip later turn hooks and output, and preserve rejection identity.
      `src/orchestration/beforeSession.acceptance.test.ts`

## Facets

- [ ] Move startup into the existing error-handling boundary so the acceptance test passes; leave existing successful-start tests unedited.
- [ ] Preserve the spec's cleanup decision: afterSession runs after partial startup and deployers track their own acquired resources.
- [ ] Add a CHANGELOG entry explaining the changed error and cleanup callbacks for existing consumers.
- [ ] Let CI verify the existing tests, build, typecheck, lint and formatting requirements.

## Out of scope

- Changing the instanceof Error gate, handling failures in the error/cleanup hooks themselves, or usage accounting across tool rounds (#93).