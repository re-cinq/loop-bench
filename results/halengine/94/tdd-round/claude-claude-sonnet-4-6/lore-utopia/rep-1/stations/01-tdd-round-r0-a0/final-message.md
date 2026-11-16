Branch is clean and up to date. 

Summary: Moved `beforeSession` from before the `try` block to inside it in `chatOrchestrator.ts`. Added a unit test (`calls onError and afterSession when beforeSession throws`) to `chatOrchestrator.test.ts` that was RED before the fix and GREEN after. Updated `specs/hal-engine-config-hooks/spec.md` to move the guarantee from "Measured semantics — out of scope" to the main body with two validated-by citations, and added a `### Fixed` entry to the CHANGELOG. All three DoD facets are now ticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Move beforeSession inside the try block (with spec and CHANGELOG)","tdd_next":"acceptance green"}}