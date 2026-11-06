This round closed facet 1 only. It added `ajv` (`^8.20.0`) to `dependencies` in `package.json` and `package-lock.json`, and bumped the version from 0.3.0 to 0.4.0, which is a MINOR bump. I ticked the facet in `.lore/dod.md`. The commit is pushed and the branch is level with its upstream. `origin/main` had nothing new to merge.

The facet is dependency and version metadata only, so there was no behaviour to put a failing test on. That makes it a round with no red phase, and I ran no tests here. CI's verdict on the acceptance tests is still to come.

`node_modules` here still holds `ajv` 6.15.0, a dev-only copy pulled in by `eslint`. The code that uses `ajv` 8 comes in a later round, and CI will install the correct version from the lockfile.

I touched no source code, so no regressions are possible. 0 red tests were mine and 0 were regressions.

`CHANGELOG.md` has no 0.4.0 entry yet. That belongs to facet 4.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv to dependencies and bump version MINOR","tdd_next":"Compile static inputSchema at register time (throw naming the tool) and cache function-valued schema validators by WeakMap"}}