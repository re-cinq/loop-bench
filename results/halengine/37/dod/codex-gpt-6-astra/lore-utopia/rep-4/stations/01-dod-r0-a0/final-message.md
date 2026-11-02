The registry has a direct test seam, but the full contract conflicts with the no-stubs rule: the ticket explicitly requires a stub-provider retry test. Existing orchestrator tests use provider doubles; the shipped mock provider cannot emit tool calls.

Please permit a scripted provider for that acceptance test, or split orchestrator recovery into a separate ticket. No files changed or tests run; a partial registry-only suite would not establish DONE.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Permit a scripted provider for the required rejected-call/corrected-retry acceptance test, or move orchestrator recovery to a separate ticket; the no-mocks/no-stubs constraint currently prevents that required coverage."}}