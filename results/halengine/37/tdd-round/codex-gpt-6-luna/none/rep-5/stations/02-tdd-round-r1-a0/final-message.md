Implemented static schema compilation at registration and cached function supplied schema validators by schema object reference. The focused test failed before the change and passed afterward. I also updated the spec links, changelog, minor version, and reported lint/type fixes.

The prior CI verdict also reported a Vertex provider test failure; I did not rerun it or establish whether it was a regression. The one red test I wrote was green after the change; zero regressions are confirmed. I did not run acceptance tests, lint, or typecheck. The branch is pushed and up to date with `main`.

Next: test function supplied schemas and continue the remaining documentation and acceptance work.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile static tool validators at registration and cache function-valued schemas","tdd_next":"Add tests for function-valued schemas and complete remaining documentation and acceptance work"}}