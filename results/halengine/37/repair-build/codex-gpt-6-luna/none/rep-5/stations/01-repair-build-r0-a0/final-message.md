Fixed the Ajv import, added schema validation before the executor runs, attached the original schema error as `cause`, and corrected the two reported lint issues. Formatted the changed files, committed as `c222983`, pushed it, and merged `origin/main` (already up to date). The branch is even with its upstream.

I did not run the failing checks locally, as instructed; CI will judge the pushed fix.

LORE_NODE_RESULT: {"outcome":"success","extras":{"ci_fixed":"Corrected Ajv's default import and added input rejection before executor calls; fixed reported lint issues."}}