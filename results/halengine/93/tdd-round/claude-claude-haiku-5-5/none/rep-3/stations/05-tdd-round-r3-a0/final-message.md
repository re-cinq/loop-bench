The CI findings are fixed and pushed, but I did not verify the eslint fix locally. Nothing was tested in this pod.

**What the verdict named:** the build for `88378e5` was red on `eslint` and `spec-names`. Both came from the same cause: two spec-link citations in `specs/hal-engine-config-hooks/spec.md` pointed at stale lines of `src/orchestration/orchestratorHelpers.test.ts` (`#L35` and `#L41`). The tests had moved to `#L40` and `#L46` when earlier commits on this branch inserted tests above them.

**What I did:**
- Ran the repo's own `npm run spec:names -- --fix`, which repointed the two citations from the test names they carry. The check is now clean: 593 citations name the test they point at.
- Ran `prettier --write` on the spec and committed as `fe2d8c6` (docs(specs): repoint usage citations to their tests' current lines).
- Pushed. The branch is level with its upstream (0 ahead, 0 behind), and `origin/main` is already contained in it, so no merge was needed.

**Not verified here:**
- The eslint `require-spec-link` error on the test at line 46 should clear now that the spec cites `#L46`. I read the rule's behaviour from the message rather than running eslint, since it can OOM this pod. CI will confirm.
- No tests, lint, or typecheck were run in this pod. This round wrote no new test, so there was no red-green cycle.

**Test accounting:** no tests were red in CI's verdict; only lint and the spec-link check failed. Both failures are from this branch's own earlier edits, not from a pre-existing test, so none are regressions in the sense the ticket defines. I changed no facets. All facets in `.lore/dod.md` were already ticked, and I left that file as it was.

**Unrelated smells noticed, not touched:** none beyond the above.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Repointed stale spec-link citations for the usage tests (CI findings: eslint require-spec-link, spec-names)","tdd_next":"acceptance green"}}