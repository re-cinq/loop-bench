I added one acceptance test for #94. It fails today, and it's committed and pushed. The branch is up to date with `origin/main` and not ahead of its upstream.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` already takes hooks, so the test calls it with a `beforeSession` that throws.

The test is `src/orchestration/beforeSessionFailure.acceptance.test.ts`. It pins three things:
- The caller still gets the original rejection.
- `onError` fires with `(session, error)`.
- `afterSession` fires after it.

I ran it with `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/beforeSessionFailure.acceptance.test.ts`. It fails for the reason the ticket gives: no hook runs.
```
- Expected  - 27
+ Received  +  1
-   "events": Array [ "onError", {session…}, [Error: allocation failed], "afterSession", {session…} ],
+   "events": Array [],
    "rejection": [Error: allocation failed],
```
The rejection already matches, so the first acceptance criterion holds today and the failure is only the missing hooks.

`.lore/dod.md` opens with the ticket's central claim and lists the remaining facets: the code move, the spec line replacement and the CHANGELOG entry.

I did not edit `specs/hal-engine-config-hooks/spec.md`. Its recorded-flaw line is the very statement this fix replaces, and the ticket asks the implementing round to write the new guarantee, including what a hook can assume about how much of the turn happened. That round also needs to add the `validated by` link to the test. The repo has no `scripts/spec-links/reanchor.mjs`, so the `#Lnn` links on the spec statements it touches need checking by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}