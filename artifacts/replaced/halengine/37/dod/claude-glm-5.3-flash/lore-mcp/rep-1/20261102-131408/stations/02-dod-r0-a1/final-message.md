This round found the red DoD already committed on the branch (`cfd444a`, pushed); my work was verifying it is genuine rather than re-writing it. Everything checks out.

**Triage: `direct`** — recorded in `.lore/dod.md`. The seam already exists: `ToolRegistry.execute` and `register` are the real entry points, so every criterion is observed through them.

**The deliverable** — two new test files, nine tests (the issue's criteria one-for-one, seven red + two pins):

- `src/orchestration/tools/registry.acceptance.test.ts` — 8 tests
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — the tool-loop test

**Verification run** (jest over exactly those two paths):

```
Tests:       7 failed, 2 passed, 9 total
Test Suites: 2 failed, 2 total
```

Every red test fails for the ticket's stated claim — the executor runs on input any schema would reject and answers confidently. Quoting the actual failure output:

- **`{}` on a required `location` string** → `"rejection": "18°C and partly cloudy, humidity 65%"`, `"executorCalls": 1` — the forecast for `'Unknown'` class of bug, at the registry boundary (issue criterion 1+2).
- **wrong-typed field** → `"rejection": "18°C and partly cloudy, humidity 65%"` — no path, no expected type (criterion 4).
- **uncompilable schema at `register`** → `Expected pattern: /get_weather/ — Received function did not throw` (criterion 5).
- **function-valued schema changed between calls** → `"executorCalls": 2`, stale schema not enforced (criterion 6).
- **compile-once for static schemas** → `Expected length: 1 — Received length: 0`; no validator is ever compiled (criterion 7).
- **rejected input's values kept out of result and logs** → rejection is the forecast, not a rejection (criterion 10; the log half is already clean — the engine logs `inputKeys` only — so the test correctly fails only on the absent behaviour).
- **tool loop** → `rejectionText: "weather for undefined: 18°C"`, `executorCalls: 2` — exactly the tech-note path: the malformed call reaches the executor and comes back as a confident answer instead of a readable rejection (criterion 8).

The two green tests are the deliberate pins (`toEqual` pass-through of unlisted properties; the unchanged `Unknown tool` throw) and stay green.

**Also verified**: spec `specs/hal-engine-tool-input-validation/spec.md` cites every test with inline `([validated by ...])` links whose `#Lnn` anchors match current line numbers; `.lore/dod.md` quotes the claim verbatim; all committed files pass `prettier --check`; branch is 1 ahead / **0 behind** `origin/main` (nothing to merge), working tree clean, `origin/loop-bench/37` at `cfd444a`.

Findings for the next (implementation) round: `ajv@6.15.0` is present in `node_modules` only transitively — it must move to `dependencies` (the compile-once test spies `Ajv.prototype.compile`, so it fails honestly until the registry actually compiles). The dod.md "Facets" list carries the remaining green-side steps: dependency, per-call cache keyed by resolved schema, one-line doc comment pointing at the spec, README/docs/.specify updates, CHANGELOG entry, MINOR bump, and the spec `Status` row flip to `Shipped` once green (the row currently reads `Draft`; `re-lint/require-status-matches-coverage` will flag it the moment the tests pass).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}