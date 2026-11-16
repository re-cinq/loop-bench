I've successfully fixed all three eslint errors reported in the CI build:

## Changes Made

1. **Removed unused eslint-disable** (line 17): The `eslint-disable-next-line camelcase` comment on the `VALIDATORS` constant declaration wasn't suppressing any warnings—the individual camelcase violations were already suppressed by comments on the specific keys.

2. **Flattened nested if for limit validation** (line 87): Combined the outer `if (message.limit !== undefined)` with the inner `if (!isValidLimit(message.limit))` into a single guard clause: `if (message.limit !== undefined && !isValidLimit(message.limit))`.

3. **Extracted before cursor validation** (line 95): Moved the cursor error check from nested inside the `if (message.before !== undefined)` to a top-level check using a ternary operator: `const beforeCursorError = message.before !== undefined ? validateListSessionsCursor(message.before) : null;`. This eliminates the nested if pattern while preserving the validation logic.

The code structure remains functionally identical—the changes only affect the control flow layout to satisfy the `re-lint/no-nested-if` rule. Eslint verification confirms all errors are now resolved.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI linting failures","tdd_next":"acceptance green"}}