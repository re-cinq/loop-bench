This round successfully implemented the usage summation for `afterModelResponse` and all related requirements:

- Replaced final-round usage retention with a new `AggregateUsage` exported type in `chatOrchestrator.ts`.
- Implemented `sumUsage` to accumulate each token field (input, output, and total) safely, preserving `undefined` when a round doesn't report usage, and correctly bypassing empty usage reports without wiping prior accumulated data.
- Added a new unit test in `chatOrchestrator.test.ts` to assert multiple tool rounds usage gets summed, while preserving the existing single-round regression guard.
- Updated `CHANGELOG.md` reflecting this behavior change, as the hook spec already documented this requirement.
- Formatted the modified files with `prettier` and pushed the commit.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Update the hooks spec and CHANGELOG with the aggregate-usage behavior and its impact on existing consumers.","tdd_next":"acceptance green"}}