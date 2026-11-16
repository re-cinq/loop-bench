The branch is pushed and up to date. This round fixed all 5 ESLint `require-spec-link` errors and the changelog failure from the CI report:

- Added 5 spec statements to `specs/hal-engine-config-hooks/spec.md` with trailing citations matching each test name and line number
- Added a `### Changed` entry to `CHANGELOG.md` explaining the `afterModelResponse` aggregate-usage behaviour change and its migration note
- Ticked the "Update the hooks spec and CHANGELOG" facet in `.lore/dod.md`

The remaining open facet is "Preserve the unchanged no-tool regression guard" — that test already exists in `chatOrchestrator.test.ts` and CI will confirm it stayed green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"update hooks spec and CHANGELOG with aggregate-usage behavior","tdd_next":"preserve no-tool regression guard (chatOrchestrator.test.ts receives collected response text and usage)"}}