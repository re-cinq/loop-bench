Resolved the CI `re-lint/no-flag-params` failure at `src/transport/ws/validation.test.ts:75:69` by replacing `Array(...).fill(false)` with `acceptedBadFrames` filtered by `validateMessage(frame).valid` and asserted against `[]`, verified `src/transport/ws/validation.test.ts`, formatted with Prettier, and pushed `a512d7b` to `origin/loop-bench/144`.

- Red tests on the previous push: 0 of ours, 0 regressions (CI failed at the `eslint` step on `src/transport/ws/validation.test.ts:75:69`).
- Unrelated smells noticed (untouched): `CHANGELOG.md`'s earlier `#143` entry under `[Unreleased]` still states `"Nothing in the engine calls it yet: the store answers the list, and the route or frame that carries it to a client is still yours to write"` beside the new `list_sessions` entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Resolve CI re-lint/no-flag-params failure in src/transport/ws/validation.test.ts","tdd_next":"acceptance green"}}