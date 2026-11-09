# Definition of Done

> It is called once per user message, after the round loop exits, and is handed the `lastUsage` local: `chatOrchestrator.ts` assigns `lastUsage = outcome.usage ?? lastUsage` on each round, so what the hook receives is the usage of the final provider call alone.

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` accepts any `AIProvider`, and the repo's own tool-loop tests drive multi-round turns through scripted providers, so the acceptance tests call the real orchestrator today and fail on the usage the hook receives.

Decision the tests pin (the ticket's "decide, and make the signature say the answer"): accumulate across rounds and pass the sum, keeping one `usage` argument. The other shape — the summed total plus a per-round breakdown — is rejected because the ticket pins a no-tool turn to exactly what the hook reports today via an existing unedited test, and a wrapper shape moves that path's value; no consumer in this repo needs provider-call granularity while the audit/billing feature itself stays out of scope. The unambiguity criterion is met at the signature: the third parameter is renamed `totalUsage` with a one-line JSDoc saying it is the sum across the turn's provider calls. This is a behaviour change for tool-heavy turns and ships as a MINOR bump with a changelog line saying so.

## Done when these pass

- [ ] **reports usage covering every provider call of a turn that ran two tool rounds** — three provider calls reporting 12/24/46 total tokens deliver 82, not the closing round's 46; today it fails with exactly the under-count the ticket reports
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`
- [ ] **counts the rounds that reported when a round in between reports none** — a silent round contributes nothing, so the sum stays defined and finite (14+8=22) instead of becoming `undefined` or `NaN`; today it fails with the last reported round alone (8)
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`
- [ ] **still reports no usage when no round of the turn reports any** — the sum of nothing is no usage, so the hook still receives `undefined` rather than a zeroed or `NaN` total. A pin: it is green today by design, because today's `lastUsage` already stays `undefined`; it guards the accumulation against inventing a `{0, 0, 0}` total
  `src/orchestration/afterModelResponseUsage.acceptance.test.ts`

Run with:

```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/afterModelResponseUsage.acceptance.test.ts
```

## Facets

- [ ] Make the two red tests green: in `chatOrchestrator.ts`, sum the usage every round of the turn reports (`stop` chunks, via `extractUsage`) and pass that sum to `afterModelResponse`; a turn whose rounds report nothing still passes `undefined`. `lastUsage`-style carry-over for the stream itself is untouched.
- [ ] Make the signature say the answer: rename the third parameter of `OrchestratorHooks.afterModelResponse` to `totalUsage` and give it the one-line JSDoc (comments are capped at one line by `re-lint/max-comment-lines`). No test can observe a parameter name — TypeScript cannot extract tuple labels — so this criterion is judged at the signature and its spec statement, not by a red test.
- [ ] Regenerate the generated copies of the hook declaration: `node scripts/check-doc-blocks.mjs --fix` rewrites the `<!-- doc-block: src/orchestration/chatOrchestrator.ts#OrchestratorHooks -->` block in `CLAUDE.md` and `specs/hal-engine-architecture/spec.md`; `docs/getting-started.md`'s hook example can follow the rename.
- [ ] CHANGELOG: an entry under `## [Unreleased]` → `### Changed` stating what an existing consumer will now record on tool-heavy turns and that no-tool turns are unchanged; MINOR bump at release. `bash scripts/check-changelog.sh` fails the PR while `src/` changes without it.
- [ ] Existing pins stay unedited and green under the new semantics: `receives collected response text and usage` (`src/orchestration/chatOrchestrator.test.ts` — a no-tool turn, the ticket's unchanged-common-path criterion), `keeps the usage an earlier round reported when a later round reports none` (same file — one reported round sums to itself), and toolBudget's `hands afterModelResponse text ending in the sentence, and the usage of a run without the hook` (both compared runs sum identically).
- [ ] Traceability: the spec statements the tests validate live in `specs/hal-engine-config-hooks/spec.md` § "Usage reported to `afterModelResponse`" with `([validated by …])` citations — this repo's established form (`.lore/test-commands.yml` exposes no descriptor-side `spec` field to stamp). `node scripts/check-spec-anchor-names.mjs`, `node scripts/check-spec-links.mjs` and `node scripts/check-spec-status.mjs` all pass with the red tests in place.

## Out of scope

- The audit entry or billing record itself — a consumer's concern, installed through the hook.
- Token accounting for anything other than the provider calls the orchestrator makes.
- The `stop` chunk's own `usage` shape; the issue only aggregates what providers already populate.
- The per-round breakdown argument (the rejected second shape) — parked unless a consumer asks for provider-call granularity.
- `npm run build`, `npm run typecheck`, `npm run eslint`, `npm run prettier:check` for the implementing round: this pod runs the acceptance tests only; CI's `verify` job is the judge of the rest.