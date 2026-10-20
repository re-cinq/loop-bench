I have implemented the subscription handling for `localLink`, supporting both `AsyncIterable` and `Observable` procedure results, including resolving tracked envelopes and passing/aborting the operation signal properly on unsubscribe. I also resolved the pre-existing CI typecheck failure (missing `tslib` module helper) in `@trpc/server:build` by installing `tslib` and formatting all modified files.

The unit tests for `localLink` run successfully in this pod. All facets in `.lore/dod.md` are now checked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Handle subscription operations in localLink (both async iterables and observables, including tracked envelopes) and abort the operation signal on unsubscribe.","tdd_next":"acceptance green"}}