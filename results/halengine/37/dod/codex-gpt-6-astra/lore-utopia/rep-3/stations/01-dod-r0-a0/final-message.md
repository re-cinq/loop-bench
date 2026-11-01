The registry has a direct test seam, but the full ticket conflicts with the acceptance-test rules: it explicitly requires a stub-provider retry test, while your contract prohibits all stubs. The shipped mock provider cannot issue tool calls.

Please allow a scripted provider for that integration test, or move that criterion into a separate ticket. I changed no files and ran no tests; a registry-only suite would leave the required retry behavior unproven.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Allow a scripted AIProvider for the required rejected-call/corrected-retry integration test, or split that criterion out: the acceptance contract prohibits stubs, and the shipped mock provider cannot issue tool calls."}}