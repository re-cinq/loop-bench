Round complete. Summary:

**What CI owed:** The d199575 build's red `test` check was `storeListAgreement.test.ts` failing 3× on mongod-binary download ENOENTs — a cold-cache race, not a code regression. All six mongo suites spawn `MongoMemoryServer.create()` in parallel jest workers against one download directory (`node_modules/.cache/mongodb-binaries`, wiped by `npm ci` on every CI run), and two workers downloading at once corrupt each other's archive. I reproduced it locally: two suites on a cold cache failed exactly that way (`rename '.downloading' -> '.tgz'` ENOENT, one suite dead, 120s).

**Red:** the existing failing file, by name (the verdict's finding). **Green:** a jest `globalSetup` hook — `scripts/mongoBinaryWarmup.mjs` calls `MongoBinary.getPath()` from the public package entry, downloading once in the parent process before any worker spawns; `jest.config.js` wires it. Same two suites, cold cache again: one download, 5/5 pass in 3s. No src/ change, so coverage floors, typecheck and the prettier glob are untouched; no spec cites `jest.config.js` by anchor.

**Red test accounting:** 0 red tests were mine; the 3 CI failures were infrastructure flake from a main-side test, 0 behaviour regressions from this branch.

**Noted, not acted on:** `mongoTestSupport.ts`'s "one-time mongod binary download" comment now describes a path the warmup bypasses (the 120s `beforeAll` timeout stays as defensive depth); CI could skip the per-run 65MB download entirely by caching a dir outside `node_modules`. Both are out of this round's scope.

**Next facet:** the dod's last unchecked one — the `transport.history` opt-in answering `UNSUPPORTED` plus the exported `StoreCannotList` — still marked the ticket owner's call, since the current acceptance suite expects `session_list` answers from engines started with no transport option and a default-off flag reddens all three; if it stays deferred, the docs/config/version facets (`example/full-config.ts` + `npm run docs:fix`, MINOR bump) follow.

Branch pushed and up to date with `origin/main` (merge was a no-op); `git status` reports it even with upstream.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: warm the mongod binary once in jest's parent process so parallel mongo suites never race a cold download","tdd_next":"the transport.history opt-in + StoreCannotList facet (ticket owner's call), else the docs/full-config and MINOR version facets"}}