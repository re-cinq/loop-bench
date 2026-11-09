The gate is present, but the provider acceptance criteria conflict with the prohibition on test doubles: the implemented network providers normalize failures into `Error`, and the shipped mock provider cannot reject with arbitrary values.

Testing a throwing lifecycle hook would exercise the gate but leave the required provider cases unproven. No files changed or tests run.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please permit a minimal rejecting AIProvider test fixture, or identify a supported real provider configuration that rejects with a string, plain object, and undefined. The required provider cases otherwise need the test doubles this task prohibits."}}