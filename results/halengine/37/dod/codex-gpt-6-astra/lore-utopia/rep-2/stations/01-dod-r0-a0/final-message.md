The registry supports direct acceptance tests, but the full ticket conflicts with the no-stubs requirement: it explicitly requires a stub-provider retry test. The existing built-in provider never emits tool calls, so it cannot exercise rejection followed by correction.

Please allow a scripted test provider or supply a real, configurable provider seam for that scenario. No files changed or tests run.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please permit the scripted provider required by the tool-loop acceptance criterion, or provide a real configurable provider seam: the no-mocks/no-stubs contract prohibits the requested stub, and the built-in provider cannot emit tool calls."}}