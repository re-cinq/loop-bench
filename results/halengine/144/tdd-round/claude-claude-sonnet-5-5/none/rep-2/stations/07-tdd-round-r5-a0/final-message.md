I fixed the one eslint finding CI reported, a `max-expects` error in `src/transport/ws/validation.test.ts`. The branch is pushed and not ahead of its upstream, and `origin/main` was already merged.

- **The fix:** the "rejects a list_sessions limit…" test had two `expect` calls. I replaced them with a single `expect(invalid).toEqual(Array(8).fill(false))`, which asserts the same thing.
- **Tests:** `validation.test.ts` passes (5 of 5). I ran only that file and no acceptance tests. They need `NODE_OPTIONS=--experimental-vm-modules` because the repo's jest setup loads ES modules. I ran no linter, typecheck or build, as instructed.
- **Spec links:** `scripts/spec-links/reanchor.mjs` failed with `MODULE_NOT_FOUND`. The edit doesn't change the line number of any test a spec cites, so I left the links alone.
- **Red tests:** none were mine and none were regressions; the only red item was the lint finding.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: eslint max-expects in validation.test.ts","tdd_next":"acceptance green"}}