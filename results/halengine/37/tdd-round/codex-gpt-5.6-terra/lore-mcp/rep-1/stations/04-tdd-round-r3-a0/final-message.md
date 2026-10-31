Implemented and pushed `e43ef4a`.

- Added a red/green unit test for required-field JSON Pointer paths.
- Normalized AJV v6/v8 error paths; required and type failures now name fields without logging values.
- Reanchored affected spec links.
- Ran only `registry.test.ts` successfully; did not run acceptance tests, lint, or typecheck.
- CI count: 1 new red test, 1 non-acceptance regression repaired; the named acceptance failure was also addressed.
- Branch is merged with `origin/main` and fully pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Normalize schema-validation rejection paths across AJV versions","tdd_next":"Add the remaining unit tests, documentation, changelog, and version updates"}}