The ticket’s behavior is observable through the orchestrator’s catch path, but the existing provider implementations do not offer a way to produce the specified string, object, and `undefined` rejections. Testing those provider rejections would require a test provider or another double, which the task explicitly prohibits. A hook that throws those values would exercise the same catch block today, but would not establish the ticket’s provider-specific acceptance criteria.

No files were changed and no tests were run.

LORE_NODE_RESULT: {"outcome":"changes_requested","extras":{"dod_blocked":"Please allow a test provider that rejects with controlled values, or provide a real provider seam capable of producing those rejections."}}