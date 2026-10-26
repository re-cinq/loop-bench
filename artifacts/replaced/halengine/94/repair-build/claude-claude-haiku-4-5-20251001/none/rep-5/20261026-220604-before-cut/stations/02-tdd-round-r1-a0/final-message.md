Pushed successfully. The branch is up to date with its upstream.

The CI failure was a stale spec anchor: `specs/hal-engine-config-hooks/spec.md` pointed the "runs onError and afterSession when beforeSession throws" citation to `#L52` but the test lives at line 36. Running `npm run spec:names -- --fix` repointed it automatically.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repoint stale spec anchor for acceptance test citation","tdd_next":"acceptance green"}}