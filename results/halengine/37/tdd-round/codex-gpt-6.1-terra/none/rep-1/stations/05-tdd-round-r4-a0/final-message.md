Committed and pushed `970eb9d`. The registry now handles the validator error-path format reported by CI and avoids the unavailable AJV subpath types. The new focused test passed; acceptance tests and typechecking remain for CI.

The previous CI report named one red test written on this branch and no identified regressions; its acceptance failure summary was truncated. The coverage graph tool was unavailable, so I could not query existing coverage before the edit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle validator error paths and types across the AJV versions reported by CI","tdd_next":"Add remaining unit tests and update documentation"}}