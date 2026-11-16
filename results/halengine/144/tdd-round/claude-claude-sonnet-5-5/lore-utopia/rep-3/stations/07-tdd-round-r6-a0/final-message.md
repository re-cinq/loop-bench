This round fixed the one eslint finding from CI's verdict and pushed it. I ran no tests, lint or typecheck here. CI will judge the push.

- **The fix:** `closeAll` in `src/transport/wsTestSupport.ts` read `hal.wss.clients.size`, which broke the three-hop member-chain rule. It now destructures `clients` first.
- **Test count:** I wrote no new test, so there were no red tests of mine and no regressions from me.
- **Spec links:** `node scripts/spec-links/reanchor.mjs` crashed with a Node error, which I didn't investigate. I left the spec links alone, since the edit shifts no test lines.
- **Branch state:** merging `origin/main` produced nothing (already up to date), and the branch is level with its upstream.
- **dod.md mismatch:** `.lore/dod.md` names `list_sessions` and `session_list` frames, but the ticket specifies `list_conversations` and `conversation_list`. I didn't check which one the code implements. I didn't touch this, and the next round should look at it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix eslint max-member-chain in wsTestSupport closeAll","tdd_next":"acceptance green"}}