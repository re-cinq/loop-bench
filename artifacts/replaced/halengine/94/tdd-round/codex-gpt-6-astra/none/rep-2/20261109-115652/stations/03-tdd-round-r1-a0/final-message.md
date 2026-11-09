Blocked: the acceptance test itself is invalid. At line 30, it supplies unsupported `PromptBuilderConfig` properties; at line 40, its three assertions violate `max-expects`. Your instructions require stopping when an acceptance test needs correction.

CI also reports a forbidden import in the previous round’s initialization test. No test failures were reported—only typecheck and lint findings; regression counts are unverified.

No files changed, no commit pushed, and no tests ran here.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance test contains invalid configuration and prohibited assertion count; correcting acceptance tests is explicitly forbidden."}}