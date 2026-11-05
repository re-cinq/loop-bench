Blocked by a local/CI mismatch: installed Ajv 8.20.0 provides the export CI reported missing. My single new test passed immediately, so no valid red–green round occurred. I removed the exploratory changes; nothing was committed or pushed.

Local red tests: 0 mine, 0 regressions. CI’s truncated report prevents an exact regression count.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Cannot reproduce CI's missing Ajv export with installed Ajv 8.20.0; the new test passed before any implementation change."}}