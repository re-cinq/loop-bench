I fixed the ESLint error in `src/orchestration/usageSumming.test.ts` by refactoring the `sendMessage` mock to use an early return. I also identified and fixed a robustness gap in `src/orchestration/chatOrchestrator.ts` where partial usage reported by a provider (missing some token fields) could result in `NaN` for the aggregate total; I added a test case in `usageSumming.test.ts` to reproduce and verify this fix. Finally, I exported `AggregateUsage` from the package root in `src/index.ts` to ensure the public API is complete and consumers can easily type their hooks.

- **Done:** Fix ESLint error and handle partial usage to avoid NaN in aggregate totals.
- **Next:** acceptance green

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle partial usage and avoid NaN","tdd_next":"acceptance green"}}