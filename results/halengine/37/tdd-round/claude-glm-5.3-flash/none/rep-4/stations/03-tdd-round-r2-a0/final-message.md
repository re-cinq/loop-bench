Round complete. Summary:

**CI repairs (owed first, from the round brief):**
- `specs/hal-engine-tool-input-validation/spec.md:6` — `Status` flipped `In Progress` → `Shipped`; all 8 statements carry citations, which is exactly what `Shipped` records. `check:spec-status` passes (0 findings, 20 docs).
- `src/orchestration/tools/registry.ts:68` — `failingPath` moved below its caller `describeValidationErrors` (pure code motion).

**Facet closed** (the last open box in `.lore/dod.md`): docs/example/ADR brought to the new contract.
- `example/weather-tool.ts` — the executor no longer defaults a required field (`|| 'Unknown'` is gone); it reads `location` as the string the schema guarantees and handles only the genuinely optional `units`.
- `docs/adding-a-tool.md` — executor guidance now states input has already passed the declared schema, undeclared keys may still be present, and a rejection is returned to the model rather than thrown; the schema section states register-time compilation. Doc-block regenerated via `docs:fix`; `docs:check` 0 findings.
- `README.md` — the feature bullet no longer claims the schema is **not** enforced; it states what the registry now does.
- `.specify/spec.md` — records rejection-as-tool-result (not an exception), the tool-round bound as what stops a retry cycle, and pass-through of extra properties. Two adjacent same-topic falsehoods corrected: the provider (not the registry) was said to validate calls, and §6 claimed tool *results* are schema-validated — output validation is explicitly out of scope per the ticket.
- `adrs/ADR-002-response-validation.md` — records that the tool-input half shipped in #37 with `ajv` against the already-declared `inputSchema` (no second schema), while the Zod/response-validation proposal stays `status: proposed`.

**Tests:** I wrote no test this round — the facet is prose and code motion, and a test pinning source text is out of bounds. The bar I kept is the unit file covering the moved function: `registry.test.ts` ran once, **6/6 passed**. Acceptance tests were not run here; CI judges the push. Red tests mine this round: 0 new; the two eslint errors were from my branch's previous push, both repaired; regressions: none observed.

**Named, not acted on:** `docs:check-paths` reports 3 pre-existing unresolved paths (`dist/index.js`, `dist/index.d.ts` in `.specify/spec.md` and the npm-release spec) — they reference build artifacts absent from any checkout, identical before my changes. Also the ticket's `Unknown tool` throw stays as the deliberately-opposite failure class, per scope.

Committed as `7cd1c60`, pushed; `origin/main` merged (already up to date); branch reports not ahead of upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"docs/example/ADR updated to the input-validation contract, plus the two eslint findings CI reported on cc47110","tdd_next":"acceptance green"}}