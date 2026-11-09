# Definition of Done

> `ToolRegistry.execute` looks a tool up, logs the input's key names, and calls the executor
> without ever checking the declared `inputSchema` (`src/orchestration/tools/registry.ts`).

**Strategy: `direct`** — the seam already exists: `ToolRegistry.register`/`execute` are the real
public entry points and are called directly on a real registry, and the tool-loop test drives the
real `createChatOrchestrator().processMessage` with a scripted provider. `ajv` is not in
`dependencies` yet, so every validation test fails because the check is absent, not because an
import is broken (the tests import only modules that exist today). Note on file names: the issue
asks the implementation for `src/orchestration/tools/registry.test.ts` and a tool-loop case in
`chatOrchestrator.test.ts`; the acceptance tests below live beside those in `*.acceptance.test.ts`
files so this pod's harness never locks the implementation out of its own files.

## Done when these pass

- [ ] **returns a rejection naming location as required and never calls the executor when required
      input is missing** — `execute` validates before the executor runs; a rejection is a returned
      `ToolResponse`, executor call count 0
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **rejects a number where a string is required, naming the field path and expected type but
      never the value** — the message names path and type; the offending value is absent
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **keeps an identifying input value out of the rejection text and every log line** — redaction
      pin: capture all log levels through `setLogger`, value must appear nowhere
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **throws at register time for an uncompilable schema, naming the tool** — static schemas
      compile at `register`, so a broken schema fails at startup
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **validates a function-valued definition against the schema current at that call, not a stale
      cached one** — function-valued `ToolDefinitionSource` resolves per call
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **compiles a static schema once at register: ten execute calls keep validating against the
      register-time schema** — compile-once, observed by snapshot semantics: relaxing the live
      schema object after register cannot un-require a field
      `src/orchestration/tools/registry.acceptance.test.ts`
- [ ] **returns a schema rejection to the model as a tool result it can read and correct on the next
      round** — `processMessage` resolves, rejection text visible to the provider next round,
      executor only ever sees the corrected call
      `src/orchestration/chatOrchestrator.acceptance.test.ts`
- [x] **passes valid input with an unlisted extra property through to the executor unchanged,
      exactly once** — passes today; `toEqual` guard so an added default or coerced value fails it
      `src/orchestration/tools/registry.acceptance.test.ts`
- [x] **still throws Unknown tool for an unregistered name** — passes today; pins behaviour the
      issue says must not change
      `src/orchestration/tools/registry.acceptance.test.ts`

## Facets

- [ ] Add the JSON Schema validator (`ajv` unless the build proves otherwise) to `dependencies` in
      `package.json` — not peerDependencies, not devDependencies
- [ ] Compile a static tool's schema once at `register`; throw a message naming the tool when it
      does not compile
- [ ] In `execute`, validate `input` before the executor runs; on failure return a `ToolResponse`
      naming the failing property paths and the constraint, never a value
- [ ] For function-valued sources, resolve per call and cache the compiled validator by the resolved
      schema object
- [ ] Give `execute` a one-line doc comment (`re-lint/max-comment-lines` rejects a `@param` block)
      pointing at `specs/hal-engine-tool-input-validation/spec.md`
- [ ] Update `docs/adding-a-tool.md` (input reaching an executor has passed the declared schema;
      unknown keys may still be present; a rejection is returned to the model, not thrown),
      `README.md`, and `.specify/spec.md` (rejection is a tool result; the tool-round bound stops a
      retry cycle; extra properties pass through unmodified)
- [ ] Drop the defensive cast in `example/weather-tool.ts` once the schema guarantees the shape — its
      comment claiming `inputSchema` does not enforce becomes false
- [ ] Add a `CHANGELOG.md` entry under `## [Unreleased]` written for a consumer of the package
- [ ] Bump the version MINOR and state the migration note in the PR body: executors that
      hand-validated their input now receive only schema-accepting input, and tools that relied on
      seeing malformed input stop seeing it
- [ ] If any edit shifts lines in the cited test files, re-run
      `node scripts/check-spec-anchor-names.mjs specs/hal-engine-tool-input-validation/spec.md --fix`

## Out of scope

- Returning an unknown tool name to the model instead of throwing (tracked separately; the
  `Unknown tool: <name>` throw stays exactly as it is)
- Validating tool *output*; hallucination detection; an evaluation harness
- Per-tool authorization (a `ToolContext` boundary concern); retry, timeout, rate limiting
- Packaging gates these tests cannot observe: `npm run build && node --input-type=module -e
  "import('./dist/index.js')"` exiting 0 and ajv living in `dependencies` rather than
  `peerDependencies` are what the CI build and smoke jobs prove, and the `npm run eslint` /
  `npm run prettier:check` legs are CI's to show