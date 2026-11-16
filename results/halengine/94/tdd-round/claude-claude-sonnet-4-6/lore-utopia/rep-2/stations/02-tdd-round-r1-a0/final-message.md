Branch is current and clean. Here's what this round fixed:

- **typecheck**: Both test files used `baseSystemPrompt`/`systemPromptSuffix`/`contextConfig` which don't exist in `PromptBuilderConfig`. Fixed to use `identity` only.
- **eslint (max-expects)**: Both tests had too many `expect()` calls. Consolidated to 1 each by capturing the rejection via `.catch()` and asserting all state in one `toEqual`.
- **eslint (require-spec-link)**: Unit test had no spec link. Added a `beforeSession error guarantee` section in `spec.md` with `([validated by: ...])` links for both tests at their new line numbers.
- **changelog**: Added a `### Fixed` entry under `[Unreleased]` describing the behavior change for existing consumers.
- Ticked the two remaining DoD facets (spec.md update, changelog).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures: types, eslint (max-expects, spec link), changelog; close spec.md and CHANGELOG facets","tdd_next":"acceptance green"}}