Branch is pushed and up to date. The round closed the "implement usage accumulation" facet:

- Added `addUsage(a, b)` to `orchestratorHelpers.ts` — sums all three token fields, returns `undefined` when both inputs are undefined, and the defined value when only one is defined.
- Replaced `lastUsage = outcome.usage ?? lastUsage` with `lastUsage = addUsage(lastUsage, outcome.usage)` in `chatOrchestrator.ts`.
- Updated `specs/hal-engine-config-hooks/spec.md` to replace the under-counting statement with the new accumulation behaviour, with a test citation.
- Added a CHANGELOG entry in the Unreleased `### Changed` section explaining the behavior change and migration note.
- Ticked the three completed facets in `.lore/dod.md`; remaining facet is verifying existing single-round tests stay green (CI will confirm).

No unrelated smells addressed (the spec's "Measured semantics" section header still names "out of scope" though the statement it contained is now normative — that header wording is a minor inconsistency to note, not act on).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across all tool rounds in chatOrchestrator","tdd_next":"verify existing single-round and no-usage tests remain green via CI acceptance run"}}