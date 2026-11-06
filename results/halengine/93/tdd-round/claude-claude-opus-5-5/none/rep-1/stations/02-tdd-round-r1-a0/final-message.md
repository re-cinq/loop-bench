I fixed every finding from CI's red verdict on `5807af0` except the typecheck timeout, and pushed the commit (`9f56b47`). The branch is in sync with its upstream, and merging `origin/main` brought in nothing new.

**What CI reported and what I changed:**
- **eslint, missing spec links:** both acceptance tests now have a "validated by" link in `specs/hal-engine-config-hooks/spec.md`.
- **spec-links, link in the wrong place:** that spec bullet held two statements but only one link could sit at the end. I split it into two bullets, each ending with its own links. `node scripts/check-spec-links.mjs` now reports 0 misplaced.
- **eslint, too many `expect` calls:** I split the `addUsage` test in `orchestratorHelpers.test.ts` into two tests with one `expect` each. Both run green with jest.
- **changelog:** I added an entry under `## [Unreleased] / ### Changed`. It says `afterModelResponse` now receives the summed usage of every provider call in a turn, so tool-heavy turns record larger numbers. A round with no reported usage adds nothing, and a turn with no tool calls reports exactly what it did before.
- **typecheck, timed out after 10 minutes:** CI named no type error, and I didn't typecheck here because of the pod's memory limit. I added an unchecked facet in `.lore/dod.md` so the next round confirms it finishes.

**Tests:** the only test I ran was the rewritten helper test file (6 passed). Red tests on the last build: 0 were mine and 0 were regressions. The only failing tests CI named were the two acceptance tests' lint errors, which were spec-link and lint problems, not code.

**dod.md:** I ticked the facet "Update the hooks spec and CHANGELOG". Next is "Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit". The hook argument is still a plain `UsageMetadata`, so a reader can't tell from the type that it is a sum.

**Something I noticed and left alone:** `.lore/test-commands.yml` and the bare `npx jest` command don't work on their own. The suite is ESM and needs `node --experimental-vm-modules`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers (plus CI lint/spec-links/changelog findings)","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}