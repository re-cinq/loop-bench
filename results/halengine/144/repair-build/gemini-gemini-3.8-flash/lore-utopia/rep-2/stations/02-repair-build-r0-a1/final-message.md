CI reported failures on `5cd4e6710184e4c23ab8d932710998781bdd6208`.

Checking `git log --format=%s 5cd4e6710184e4c23ab8d932710998781bdd6208..HEAD` revealed:
`fix(transport): handle list_sessions over WebSocket and fix lint findings (#144)` (`156a3bf0eee5e7512c19a7d028b94f5d73cc77fe`), which does not carry `[skip ci]`.

The branch moved past the judged SHA before CI evaluated the new head. No changes made.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"branch moved past 5cd4e6710184e4c23ab8d932710998781bdd6208; CI re-judges the head"}}