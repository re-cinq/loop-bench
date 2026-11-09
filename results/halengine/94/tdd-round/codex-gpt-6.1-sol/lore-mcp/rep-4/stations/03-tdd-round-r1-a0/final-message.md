The acceptance test is invalid: its `PromptBuilder` fixture uses unsupported configuration fields, as CI reported. Your instructions require stopping when an acceptance test is wrong and forbid editing it to pass.

No files changed, no tests run, no commit pushed. CI reports three findings in branch-added tests and no identified pre-existing test regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance fixture uses unsupported PromptBuilderConfig fields; repairing it requires editing an acceptance test, which this round forbids."}}