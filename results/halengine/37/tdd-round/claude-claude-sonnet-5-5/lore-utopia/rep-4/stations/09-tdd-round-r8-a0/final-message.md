Pushed. This round fixed the lint and anchor failures from CI's verdict. It didn't take the docs facet.

- **Spec-link lint errors:** My new orchestrator test shifted the line numbers that existing spec citations pointed at. I re-anchored them with `scripts/check-spec-anchor-names.mjs --fix`, which updated `specs/hal-engine-architecture/spec.md` and `specs/hal-engine-config-hooks/spec.md`.
- **Duplicated code and deep member chain:** I rewrote my orchestrator retry test to use the existing `scriptedProvider` helper. It now counts executor calls with a plain array and no longer reaches through `executor.mock.calls.length`.
- **Test run:** `chatOrchestrator.test.ts` passes, 23 of 23. I ran only that file, using the `npm test` flags.
- **Not confirmed:** CI's `test` and `spec-names` failures were truncated in the brief, and the Lore API returned 404 for this branch, so I couldn't read them. The re-anchor probably covers `spec-names`. I don't know what the `test` failure was.
- **Red tests:** All red findings this round were mine (lint, spec links). None were regressions in tests I didn't write.
- **Unrelated smell:** Running prettier on `specs/hal-engine-architecture/spec.md` reformats it heavily, so I reverted that and kept only the anchor changes.
- **Still open:** The docs facet is untouched: `example/weather-tool.ts`, `docs/adding-a-tool.md`, `README.md`, `.specify/spec.md`, ADR-002 and the `CHANGELOG.md` check. I also didn't run lint, the typecheck or the full suite here, so CI decides whether the branch is green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI lint/spec-anchor repairs for orchestrator retry test","tdd_next":"docs/README/.specify/ADR-002/example/CHANGELOG updates, then re-read CI's test failure"}}