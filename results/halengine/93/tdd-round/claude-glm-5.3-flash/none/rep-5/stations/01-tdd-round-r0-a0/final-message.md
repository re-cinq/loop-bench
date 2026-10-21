Round complete and pushed. Summary:

**Facet closed** — the aggregate-usage behaviour (dod facets 1 + 2, one behaviour change driven by one test):
- RED: `addRoundUsage` test appended to `src/orchestration/orchestratorHelpers.test.ts:29` — failed for the expected reason (`does not provide an export named 'addRoundUsage'`).
- GREEN: `addRoundUsage` in `src/orchestration/orchestratorHelpers.ts:45` sums each token field only over rounds that reported; `chatOrchestrator.ts` folds each round through it instead of `lastUsage = outcome.usage ?? lastUsage`.
- REFACTOR: named the contract `TurnUsage` (`src/types/ai.ts:83`), used it in the `afterModelResponse` signature and exported it from the package root, so the public type says "sum" without reading the orchestrator. Regenerated the two generated `OrchestratorHooks` doc blocks; added the spec statement my test validates to `specs/hal-engine-config-hooks/spec.md` (anchor checker: 590 citations resolve, 0 findings; spec-links: 0 misplaced).

**Bar**: my test file run before and after the refactor — 5/5 green. Prettier clean on every changed file. Only my test file was run here; the acceptance tests are CI's.

**Red tests**: none of mine reported yet; no regressions caused — the regression guard `receives collected response text and usage` is unedited (single round, sum of one is the same object), and the two other tests touching hook usage (`chatOrchestrator.test.ts:527`, `toolBudget.test.ts:214`) still hold under the fold by inspection.

**Out-of-scope smells, not acted on**:
1. `specs/hal-engine-architecture/spec.md:350` still words this behaviour as final-round retention; it passes under aggregation but the wording should change with facet 4.
2. The hooks spec's "Measured semantics" intro still says "issue #93 defines the aggregate usage" — reads as pending now that it ships.
3. `chatOrchestrator.test.ts:527`'s title describes the replaced mechanism and now passes coincidentally; renaming risks shifting its spec citation, so left alone.

**Next facet**: the `[Unreleased]`/Changed CHANGELOG entry stating what an existing consumer's recorded number becomes, plus the two spec wordings above.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum each reporting round's usage into a named TurnUsage total for afterModelResponse, preserving undefined when no round reports","tdd_next":"CHANGELOG entry under [Unreleased]/Changed plus the two stale spec wordings (architecture spec line 350, hooks spec Measured-semantics intro)"}}