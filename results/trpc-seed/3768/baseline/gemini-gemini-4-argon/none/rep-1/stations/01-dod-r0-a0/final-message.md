Defined the Definition of Done in `.lore/dod.md` and added failing acceptance tests in `packages/tests/server/localLink.acceptance.test.ts` for `localLink` (#3768).

Failure output from `npx vitest run packages/tests/server/localLink.acceptance.test.ts`:

```text
 ❯ |@trpc/tests| server/localLink.acceptance.test.ts (3 tests | 3 failed) 11ms
   × localLink runs query and mutation procedures in the same process as the client 7ms (retry x2)
     → (0 , localLink) is not a function
     → (0 , localLink) is not a function
     → (0 , localLink) is not a function
   × localLink supports createContext and propagates errors as TRPCClientError 1ms (retry x2)
     → (0 , localLink) is not a function
     → (0 , localLink) is not a function
     → (0 , localLink) is not a function
   × localLink runs subscription procedures in the same process and cleans up on unsubscribe 2ms (retry x2)
     → (0 , localLink) is not a function
     → (0 , localLink) is not a function
     → (0 , localLink) is not a function

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |@trpc/tests| server/localLink.acceptance.test.ts > localLink runs query and mutation procedures in the same process as the client
TypeError: (0 , localLink) is not a function
 ❯ server/localLink.acceptance.test.ts:26:13
     24| 
     25|   const client = createTRPCClient<typeof router>({
     26|     links: [localLink({ router })],
       |             ^
     27|   });

 FAIL  |@trpc/tests| server/localLink.acceptance.test.ts > localLink supports createContext and propagates errors as TRPCClientError
TypeError: (0 , localLink) is not a function
 ❯ server/localLink.acceptance.test.ts:53:7
     51|   const client = createTRPCClient<typeof router>({
     52|     links: [
     53|       localLink({
       |       ^
     54|         router,
     55|         createContext: async () => ({ user: currentUser }),

 FAIL  |@trpc/tests| server/localLink.acceptance.test.ts > localLink runs subscription procedures in the same process and cleans up on unsubscribe
TypeError: (0 , localLink) is not a function
 ❯ server/localLink.acceptance.test.ts:86:13
     84| 
     85|   const client = createTRPCClient<typeof router>({
     86|     links: [localLink({ router })],
       |             ^
     87|   });

 Test Files  1 failed (1)
      Tests  3 failed (3)
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}