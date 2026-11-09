Fixed and pushed the CI findings in commit `8c6c537`: the usage tests now have spec links, and the two-sided undefined case uses one assertion while checking both results.

Prettier and `git diff --check` passed. As requested, I did not run lint or typecheck locally; CI will judge the push. The branch is up to date with `origin/main` and is not ahead of its upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Added missing usage test spec links and combined the two assertions flagged by lint"}}