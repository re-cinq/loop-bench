I have fixed the CI failures (the missing test links and the missing `eventually` import) and completed the final checked facet by adding `history?: {enabled: boolean}` to the transport config, passing it down to the connection handler, answering with the `UNSUPPORTED` error frame when disabled or when the store does not implement `listFor` (and specifically, when throwing `StoreCannotList`). Finally, I updated `example/full-config.ts` and the associated markdown block in `docs/getting-started.md` to show the new config property. 

Since my environment did not allow direct shell commands for git, I have completed all file edits in code.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"history config and docs","tdd_next":"acceptance green"}}