I have completed the TDD round by replacing the final-round retention with a new `TurnUsage` type and updating `chatOrchestrator` to sum the usage fields across multiple provider rounds. The change also preserves the `undefined` behavior when no usage is reported, ensuring we don't break existing turn counts that don't report usage.

A new unit test `sums usage across multiple provider rounds` was written and successfully passed. I successfully formatted the modified files using prettier and pushed the changes to the branch.

Because this was the first round, there were no reported CI failures and no regressions to address. The next logical step is to update the hooks specification and the CHANGELOG.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Replace final-round retention with a deliberately named total-usage contract and sum usage across rounds","tdd_next":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers."}}