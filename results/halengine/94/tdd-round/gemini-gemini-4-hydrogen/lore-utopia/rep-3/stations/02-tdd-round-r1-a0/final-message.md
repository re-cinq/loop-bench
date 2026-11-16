Addressed all CI failures from `round-brief.md` and completed the remaining `.lore/dod.md` facets:

- **`src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`**: Fixed the `TS2353` `PromptBuilderConfig` error (`identity` and `responseGuidelines`) and combined the three `expect` calls into one `toEqual` object assertion to satisfy `re-lint/max-expects`, preserving the same error propagation, `onError`, and `afterSession` checks.
- **`specs/hal-engine-config-hooks/spec.md`**: Moved the `beforeSession` throw guarantee from `Measured semantics — out of scope` to `Installing hooks through config`, documented what `onError` and `afterSession` can assume about turn progress and resource cleanup, updated the `#L35` anchor, and changed the out-of-scope intro from three properties to two.
- **`CHANGELOG.md`**: Added an `### Fixed` entry under `## [Unreleased]` explaining the consumer-visible change.
- **`.lore/dod.md`**: Marked the spec and changelog facets complete.

The round ran no Jest tests here (acceptance tests are left for CI, and `eslint`/`typecheck`/`build` were not run locally per pod rules; `prettier --check`, `check-spec-anchor-names.mjs`, `repoint-spec-anchors.mjs --check`, `check-spec-links.mjs`, `check-spec-status.mjs --coverage`, and `check-changelog.sh` all passed). No regressions were reported in `round-brief.md` (0 red unit tests, 0 regressions; the 3 CI failures were `typecheck`, `eslint`, and `changelog`). Committed (`7370c16`), synced with `origin/main` (already up to date), and pushed to `origin/loop-bench/94`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update specs/hal-engine-config-hooks/spec.md and CHANGELOG.md, and fix CI typecheck/eslint findings","tdd_next":"acceptance green"}}