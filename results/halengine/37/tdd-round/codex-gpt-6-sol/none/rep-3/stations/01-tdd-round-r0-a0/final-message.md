Committed and pushed one round (`9c3227d`). The new registration test went red, then green after adding Ajv and compiling static schemas at registration. Only that test file ran. The branch is up to date with `main` and its upstream.

Red tests observed: 1 written this round, 0 regressions. No unrelated changes were made. The next facet is validator caching for function-valued definitions.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Add ajv to dependencies and bump the minor version","tdd_next":"Cache compiled validators for function-valued ToolDefinitionSource schemas by schema object reference"}}