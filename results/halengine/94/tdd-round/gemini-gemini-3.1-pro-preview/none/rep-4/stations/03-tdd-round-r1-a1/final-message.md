I have fixed the CI reported failures that were preventing the ticket from passing. The local branch already had the typecheck and eslint failures resolved by a previous commit (`59c8730c`), leaving only the `spec-names` failure which occurred because the earlier addition of tests shifted the line numbers that the Markdown spec files point to. 

I repointed the spec anchors by running `npm run spec:names:fix`, formatted the touched spec files, and pushed the result. I have also checked off the acceptance test in `.lore/dod.md` since it now passes cleanly and no further facets remain. All code has been pushed and merged with origin/main.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"runs onError and afterSession when beforeSession throws","tdd_next":"acceptance green"}}