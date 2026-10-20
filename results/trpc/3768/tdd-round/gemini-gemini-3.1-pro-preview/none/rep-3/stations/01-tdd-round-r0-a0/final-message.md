I have implemented the complete `localLink` functionality, covering all required facets: query and mutation procedures, `createContext` and error propagation, and full subscription support (including both AsyncGenerators and Observables, as well as unpacking `tracked` envelopes). The link and options type are properly exported from `@trpc/client`.

The unit tests I wrote locally in `packages/client/src/links/__tests__/localLink.test.ts` pass, and I have updated `.lore/dod.md` to reflect that all facets are completed. I then formatted, committed, and pushed these changes.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_next":"acceptance green"}}