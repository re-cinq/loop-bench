The acceptance requirements conflict: the ticket requires a stub-provider retry test, but your contract prohibits all stubs. The existing deterministic provider cannot emit tool calls; the real tool-capable providers require external AI services.

Please allow a scripted provider for that integration test, or split out the retry requirement. Registry-only tests would leave an explicit acceptance criterion unverified.

No files changed or tests run.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Allow a scripted provider for the required rejected-call/corrected-retry integration test, or split that requirement out: the acceptance-test contract prohibits the stub explicitly required by the ticket."}}