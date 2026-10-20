# Definition of Done

> The `eu` multi-region is not a location string. It is a separate host, `aiplatform.eu.rep.googleapis.com`, and `@google-cloud/vertexai` builds its endpoint from `location` unless it is given one. So today a consumer cannot reach it through HAL Engine at all, no matter what they put in `location`.

**Strategy: `direct`** — `createVertexProvider` already loads `@google-cloud/vertexai` through the `requireOptionalPeer` seam and constructs `new VertexAI(...)`, so acceptance tests can call `createVertexProvider` directly and observe the `VertexInit` arguments passed to the SDK constructor and the resulting stream and log output.

## Done when these pass

- [ ] **passes apiEndpoint to VertexAI when set and omits it when absent** — `createVertexProvider` forwards `apiEndpoint` to `new VertexAI(...)` when configured, and passes no endpoint override when `apiEndpoint` is absent so existing single-region deployments remain unchanged.
  `src/providers/vertex/vertexProvider.acceptance.test.ts`

- [ ] **routes an EU multi-region config end to end without rewriting location or logging apiEndpoint** — `{location: 'eu', apiEndpoint: 'aiplatform.eu.rep.googleapis.com'}` reaches `new VertexAI(...)` verbatim without string rewriting, streams a response through `sendMessage`, and emits no prompt, response, tool content, or `apiEndpoint` value in log lines.
  `src/providers/vertex/vertexProvider.acceptance.test.ts`

## Facets

- [x] Add `apiEndpoint?: string` to `VertexConfig` in `src/providers/vertex/vertexProvider.ts` with JSDoc naming the EU multi-region host as its motivating case, and pass `apiEndpoint` through to `new VertexAI({...})` with no hardcoded hostname in runtime code.
- [x] Update the Vertex configuration example and prose in `specs/hal-engine-providers/spec.md` (which replaced `docs/providers.md`) to show `apiEndpoint`, state that `location` alone cannot reach the `eu` multi-region endpoint, and note that `apiEndpoint` decides where the request goes while `location` decides what the request claims.
- [x] Bump the package version MINOR in `package.json` (`0.4.0`) and add a `CHANGELOG.md` entry stating that `VertexConfig.apiEndpoint` is additive with unchanged default behaviour.

## Out of scope

- Migrating from `@google-cloud/vertexai` to `@google/genai`.
- Validating or deriving `apiEndpoint` from `location`, or hardcoding any vendor hostname in runtime code.
- Changes to Bedrock, OpenAI, Anthropic, or Mock providers.