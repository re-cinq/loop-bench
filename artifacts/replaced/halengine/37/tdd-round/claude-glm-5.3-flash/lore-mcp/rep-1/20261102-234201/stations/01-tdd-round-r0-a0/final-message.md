Round landed: `8cc8942` pushed, branch in sync with `origin/loop-bench/37`, merge with `origin/main` was a no-op (no conflicts, nothing further to push).

## Round report

**Facet closed** — `ToolRegistry.execute` now validates `input` against the resolved definition's `inputSchema` before the executor runs, returning a rejection `ToolResponse` (dod facet 3), with the plumbing it forced: `ajv ^8.20.0` in `dependencies` (`strict: false`, `validateFormats: false`) and the MINOR bump to 0.4.0 (dod facet 1). `execute` carries the one-line doc comment pointing at `specs/hal-engine-tool-input-validation/spec.md`.

**The round's TDD path**
- RED: new `src/orchestration/tools/registry.test.ts` — rejects input missing the required `location` property without calling the executor. Failed for the expected reason: executor ran, result was `'sunny'`.
- GREEN: minimal ajv compile + validate + `errorsText` rejection in `execute`.
- Probed (library check, not an acceptance run): missing → `data must have required property 'location'`; wrong type → `data/ssn must be string`; valid input with extra keys passes unchanged. Paths and constraints only, never values — the rejection and its `log.warn` line echo no property value.
- REFACTOR: nothing to collapse — no duplication introduced, and the per-call compile is deliberately left as the triangulation point for the next facet.
- Spec: added a second citation (comma-separated inside the same trailing parenthetical) on the existing missing-required statement. `repoint-spec-anchors --check origin/main`: 404 up to date, 0 stale (my spec is branch-introduced, so its `#L4` anchor is hand-verified onto the `it(` line); `spec:names`: 399/399 citations name their tests. Prettier run over both changed TS files.

**Tests**: I ran only my one file (`--runTestsByPath`), green after formatting. No acceptance tests were run here — CI judges them. From the implementation and the probe, acceptance tests 1 (missing-required), 2 (wrong-type no-leak) and 4 (orchestrator retry loop) should now pass; acceptance test 3 (register-time throw) stays red. Red tests this round: 1, mine, turned green. Regressions: 0 known — the only pre-existing schema a test executes against is `{type: 'object'}` in `chatOrchestrator.test.ts`, which accepts its input.

**Out-of-scope smells noted, not acted on**: `example/weather-tool.ts` still casts-and-defaults with its stale warning comment (facet 4 owns it, so the example contradicts the new contract until then); the `Unknown tool:` throw still escapes the orchestrator as an exception (ticket-excluded, tracked issue); `re-lint/no-forwarding-class` is documented inert in `eslint.config.mjs` (verified in the config's own comment); `check-spec-links`'s statement-side mirror only warns from the backlog config.

**Next facet** (recorded in dod.md): compile static `inputSchema` at `register` time with a tool-naming throw on uncompilable schemas, and cache compiled validators by schema object reference (`WeakMap`) — that turns acceptance test 3 green and the compile-once / fresh-schema pins follow.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"validate input in ToolRegistry.execute, returning a rejection ToolResponse naming path and constraint without echoing values (with the ajv dependency and 0.4.0 MINOR bump it forced)","tdd_next":"compile static inputSchema at register time with a tool-naming throw, and cache compiled validators by schema object reference (WeakMap)"}}