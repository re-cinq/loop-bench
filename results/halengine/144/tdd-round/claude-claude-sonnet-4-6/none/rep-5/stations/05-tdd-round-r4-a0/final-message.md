The fix is committed and pushed. The ESLint error at line 59 was a nested `if` inside `if (frame.type !== 'connected')`. I flattened it into two sequential guard clauses: one for `connected`, one for `pong`, with `frames.push(frame)` as the fall-through — the `re-lint/no-nested-if` rule is now satisfied.

No regressions were introduced (this was a pure refactor of control flow with identical runtime behavior). No unrelated smells were touched.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix ESLint nested-if violation in conversationList acceptance test","tdd_next":"acceptance green"}}