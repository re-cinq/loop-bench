The round is blocked by errors in the acceptance test: its `PromptBuilder` configuration fails typechecking, and the test violates the one-expect lint rule. The instructions prohibit editing acceptance tests and require stopping if one is wrong, so I made no changes and ran no tests.

CI reported one acceptance test with two findings and no behavioral regression tests. It also reported a spec-link error and a missing changelog entry; those remain unresolved because the acceptance-test defect blocks the round.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"The acceptance test has typecheck and lint errors, but this round is prohibited from editing it."}}