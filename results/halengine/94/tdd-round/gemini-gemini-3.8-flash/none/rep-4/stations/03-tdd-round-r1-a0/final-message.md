This round addressed the CI findings from the previous push and closed the remaining facet for ticket #94:

1. Fixed the TypeScript compilation error (`PromptBuilderConfig` only accepts `identity`) and ESLint `re-lint/max-expects` finding in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`.
2. Repointed the spec citation in `specs/hal-engine-config-hooks/spec.md` via `check-spec-anchor-names.mjs --fix`.
3. Documented the `beforeSession` error propagation guarantee for existing consumers in `CHANGELOG.md` under `## [Unreleased] -> ### Changed`, verifying that `bash scripts/check-changelog.sh origin/main` passes.
4. Ticked off the final facet in `.lore/dod.md`.
5. Formatted all modified files with Prettier, committed the changes, and pushed to `origin HEAD`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Document in the CHANGELOG what changes for an existing consumer.","tdd_next":"acceptance green"}}