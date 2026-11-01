Committed and pushed `9a821cb`. Unprintable object rejections now reach `onError` without losing the original cause or caller value.

One new test went red → green and passed after refactoring and formatting. Regressions reported: 0; acceptance remains CI-owned. Prior ESLint timeout remains unverified. Branch is synchronized with upstream and main.

Unrelated smells: none identified.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve onError and original rejection for unprintable objects","tdd_next":"Pin original causes for ordinary plain-object and undefined rejections"}}