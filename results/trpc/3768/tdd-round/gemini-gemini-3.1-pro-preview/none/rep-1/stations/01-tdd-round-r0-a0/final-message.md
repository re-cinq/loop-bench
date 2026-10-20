I have completed the first RED-GREEN-REFACTOR round.
I created `packages/client/src/links/localLink.test.ts` to implement tests for the first three facets: query/mutation execution, `createContext` / error propagation, and data transformers. I then implemented these features in `packages/client/src/links/localLink.ts` and exported them in `packages/client/src/links.ts`. The unit tests were run directly against `@trpc/client` and passed.

No acceptance tests were run locally, as CI is the judge of the branch. There were zero red tests among the ones I ran.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle query and mutation operations in localLink by resolving context, calling the router procedure in-process, applying any configured data transformer, and emitting the result or TRPCClientError.","tdd_next":"Handle subscription operations in localLink (both async iterables and observables, including tracked envelopes) and abort the operation signal on unsubscribe."}}