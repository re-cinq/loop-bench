Pushed commit `33add2b`, which caches dynamic schemas by object identity and repairs Ajv loading. The new focused test passed; `origin/main` was already merged, and the branch is not ahead of its upstream.

The previous CI verdict also reported a failure in the existing Vertex provider factory test. Its error message was truncated in the brief, and the Lore CI lookup was unavailable, so that failure remains unresolved. The prior verdict showed one branch-written test suite failing to load and one pre-existing test suite failing; the cause of the latter is not established.

The next facet is validating input with the compiled schemas and returning a rejection to the model.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Cache dynamic tool schema validators by object identity","tdd_next":"Validate tool input and return schema rejections"}}