Blocked by an acceptance-test race: `askAfterConnect` resolves on `pong`, before the awaited list response arrives. A pong does not guarantee completion of preceding asynchronous requests.

Following the [tdd-loop skill](/private/var/tmp/loop-bench/runs/2780fbadb1ea/home-11/.claude/skills/tdd-loop/SKILL.md)—“If the test is wrong, say so and stop”—I left files unchanged. The helper needs to await the expected response.

No tests ran here; nothing committed. CI names two acceptance failures; zero new tests or confirmed regressions. Its remaining output is truncated, and Lore returned `branch not found`.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Acceptance helper resolves on pong before asynchronous list responses; correcting the acceptance test requires a separate authorized change."}}