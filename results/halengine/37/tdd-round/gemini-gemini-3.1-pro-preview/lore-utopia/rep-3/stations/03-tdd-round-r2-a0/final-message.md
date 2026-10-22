I have successfully completed this round. 

I fixed the 5 CI failure areas reported on the previous push:
1. **typecheck**: Casted `Ajv` import appropriately for `NodeNext` resolution constraints and explicitly typed `ValidateFunction` instances to resolve strict null/assignment errors.
2. **eslint**: Split tests to follow the max-assertions rule, removed the duplicated setup code by extracting it to a helper, removed unused variables, and reformatted the multi-line doc comment in `registry.ts` to be one-line.
3. **test**: Repaired the jest test suite by properly addressing global import strictness via `npm test` and removing broken `vitest` assumptions.
4. **spec-names**: Updated the anchor line numbers in `specs/hal-engine-tool-input-validation/spec.md` to point to their new locations.
5. **changelog**: Appended a release note for the validation changes to `CHANGELOG.md` under `## [Unreleased]`.

Finally, I updated `.lore/dod.md` to formally check off the first two acceptance criteria which the code now satisfies (including fixing the broken typechecks from the second criteria's first pass). The commits have been formatted, merged cleanly with `origin/main`, and pushed up to the branch.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"rejects a wrong-typed property naming the field and expected type without leaking the offending value to the result or logs","tdd_next":"throws at register time naming the tool when a static inputSchema cannot be compiled"}}