Blocked: the acceptance tests contradict ticket #144. They require listing without opt-in and an empty list when `listFor` is missing; the ticket requires default-off history and `UNSUPPORTED` errors. They also use different frame names.

Per your instruction to stop when acceptance tests are wrong, I changed nothing and ran no tests. No commit or push. The truncated CI verdict does not establish counts of failing tests versus regressions.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance tests contradict #144 on protocol names, default-off history, and missing-listFor errors; the acceptance contract needs correction."}}