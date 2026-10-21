Removed the type-only contract test rejected by CI, updated the spec link to the existing no-tool behavior test, and checked off that preserved guard in `.lore/dod.md`. The existing test was left unchanged.

No tests were written or run this round. Prettier ran on the edited Markdown files. The commit was pushed, `origin/main` was already merged, and the branch is up to date with its upstream. CI’s previous verdict named two red findings; this round fixed both. Unrelated smells: none noted.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Preserve the unchanged no-tool regression guard","tdd_next":"acceptance green"}}