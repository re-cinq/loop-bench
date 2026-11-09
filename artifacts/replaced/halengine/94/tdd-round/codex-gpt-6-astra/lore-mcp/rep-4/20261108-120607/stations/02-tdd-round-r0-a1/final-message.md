Stopped before editing: the acceptance test constructs `PromptBuilder` with `baseSystemPrompt`, `systemPromptSuffix`, and `contextConfig`, but its constructor requires `{identity: string}`. This is a type error in the acceptance test itself.

Your instructions require stopping when an acceptance test is wrong. No tests ran, and nothing was committed or pushed. Red counts remain unverified; no regressions were introduced.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test uses an invalid PromptBuilder configuration; correct the acceptance fixture before this round can proceed."}}