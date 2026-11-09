The registry has a direct testing seam, but the complete acceptance contract conflicts with the no-stubs rule: the ticket explicitly requires a stub provider to drive a rejected call and corrected retry through `processMessage`. The existing production providers offer no deterministic way to produce that sequence without a test double.

No files changed or tests run. Please permit a scripted provider for that integration test, or specify a real deterministic provider fixture.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please permit the scripted provider explicitly required by the tool-loop acceptance criterion, or supply a real deterministic provider fixture; the current no-mocks/no-stubs rule prohibits that required test."}}