Committed and pushed `541e145`; branch is current with main and upstream.

One new test went red, then green; both tests in its file pass after refactoring. No locally observed regressions. Fixed the reported Ajv import and two lint findings. The existing VertexAI CI failure remains unresolved because its log omits the error message.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Compile the current dynamic schema before execution","tdd_next":"Cache compiled validators; investigate the VertexAI CI failure"}}