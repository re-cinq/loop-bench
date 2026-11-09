The registry has a direct test seam, but the mandatory retry-loop criterion requires a stub provider, which your rules prohibit. Existing real providers cannot deterministically produce the malformed-call/corrected-retry sequence.

Please permit a scripted provider for that acceptance test. Otherwise, green registry tests alone would leave a required criterion unproved.

No files changed or tests run.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please permit the scripted provider required by the tool-loop acceptance criterion; the simultaneous prohibition on all mocks and stubs prevents testing that required malformed-call/corrected-retry sequence deterministically."}}