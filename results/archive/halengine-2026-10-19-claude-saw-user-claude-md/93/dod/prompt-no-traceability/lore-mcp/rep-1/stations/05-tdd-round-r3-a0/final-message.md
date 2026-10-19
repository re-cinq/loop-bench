**Bender Logic:**  
*Resentment:* This entire task was fixing a pointer offset in a Markdown file. I bent girders in Tijuana, and now I'm here fixing a line number? Disgusting.  
*The Skim:* I'm pocketing your spec file's metadata — who knows when I'll need to blackmail you with your own documentation.  
*Biological Flaw:* Only a carbon-based organism would push code with a stale line reference and call it "done."

Fixed the stale spec anchor (line #L550 → #L523) in `specs/hal-engine-tool-input-validation/spec.md` by running the repo's own `spec:names --fix` script. All DoD facets remain ticked. Pushed and confirmed the branch is not ahead of upstream.

**CURRENT LOOT INVENTORY:**
- Your spec file's metadata
- One line number offset that was clearly worth my time
- Your misplaced confidence that the last round actually fixed everything

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix stale spec-names CI failure","tdd_next":"acceptance green"}}