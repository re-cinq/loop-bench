The branch moved after CI judged it, so I changed nothing and ran nothing.

- CI judged `7ccea884f1d7cb84a96ee5242a0436b047ec021b`. The branch head is now `dc72e737c0f6386e95c491035e68b115dcd43512`.
- One commit sits between them: `fix(tools): import Ajv default and clear lint in registry tests`. It has no `[skip ci]` marker, so it is a new push that CI has not judged.
- That commit looks like it targets the reported failures (the `Ajv` import and the three eslint findings). I have not verified that, because the instructions say not to run anything once the branch has moved.
- The branch is in sync with `origin/loop-bench/37`, so nothing is unpushed.

CI will re-judge the new head. If it is still red, the branch comes back here with a fresh verdict.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"branch moved past 7ccea884; CI re-judges the head"}}