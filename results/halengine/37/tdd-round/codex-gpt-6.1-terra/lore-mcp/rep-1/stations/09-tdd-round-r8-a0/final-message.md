Committed and pushed `7c68464`. The new test failed before the repair and passes afterward; it verifies that an explicitly disallowed extra property is named in the rejection path. The change also addresses the visible CI import and lint findings. CI will verify the remaining failures and build checks.

The local red test was the one written this round; no regressions were observed locally. The previous CI log was truncated, so its full red-test count is unknown. No unrelated smells were identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Report the path of an explicitly disallowed additional property and repair visible CI type and lint failures","tdd_next":"Resolve remaining CI failures and complete registry tests and documentation"}}