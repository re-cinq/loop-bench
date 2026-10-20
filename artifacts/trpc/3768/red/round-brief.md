## CI reported failures on efb557252bac36f68b10e9939efbeacf189e89b3

The build for your last push is red. These checks failed: test

Where a failed step is named below, run only that step's command; otherwise map each name to the job that publishes it and run only that job's command.

```
### test (failure)

[[32mSymbol(undici.error.UND_ERR_SOCKET)[39m]: [33mtrue[39m
  }
}

[90mstderr[2m | server/httpSubscriptionLink.test.ts[2m > [22m[2mdisconnect and reconnect with an event id
[22m[39mTypeError: fetch failed
[90m    at node:internal/deps/undici/undici:15157:13[39m
[90m    at processTicksAndRejections (node:internal/process/task_queues:103:5)[39m {
  [cause]: AggregateError: 
  [90m    at internalConnectMultiple (node:net:1135:18)[39m
  [90m    at afterConnectMultiple (node:net:1716:7)[39m {
    code: [32m'ECONNREFUSED'[39m,
    [errors]: [ [36m[Error][39m, [36m[Error][39m ]
  }
}


[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 3 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m [30m[42m @trpc/tests [49m[39m server/localLink.acceptance.test.ts[2m > [22mlocalLink runs query and mutation procedures in the same process as the client
[41m[1m FAIL [22m[49m [30m[42m @trpc/tests [49m[39m server/localLink.acceptance.test.ts[2m > [22mlocalLink runs query and mutation procedures in the same process as the client
[41m[1m FAIL [22m[49m [30m[42m @trpc/tests [49m[39m server/localLink.acceptance.test.ts[2m > [22mlocalLink runs query and mutation procedures in the same process as the client
[31m[1mTypeError[22m: (0 , localLink) is not a function[39m
[36m [2m❯[22m server/localLink.acceptance.test.ts:[2m26:13[22m[39m
    [90m 24| [39m
    [90m 25| [39m  [35mconst[39m client [33m=[39m createTRPCClient[33m<[39m[35mtypeof[39m router[33m>[39m({
    [90m 26| [39m    links[33m:[39m [[34mlocalLink[39m({ router })][33m,[39m
    [90m   | [39m            [31m^[39m
    [90m 27| [39m  })[33m;[39m
    [90m 28| [39m

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/9]⎯[22m[39m

[41m[1m FAIL [22m[49m [30m[42m @trpc/tests [49m[39m server/localLink.acceptance.test.ts[2m > [22mlocalLink supports createContext and propagates errors as TRPCClientError
[41m[1m FAIL [22m[49m [30m[42m @trpc/tests [49m[39m server/localLink.acceptance.test.ts[2m > [22mlocalLink supports createContext and propagates errors as TRPCClientError
[41m[1m FAIL [22m[49m [30m[42m @trpc/tests [49m[39m server/localLink.acceptance.test.ts[2m > [22mlocalLink supports createContext and propagates errors as TRPCClientError
[31m[1mTypeError[22m: (0 , localLink) is not a function[39m
[36m [2m❯[22m server/localLink.acceptance.test.ts:[2m53:7[22m[39m
    [90m 51| [39m  [35mconst[39m client [33m
...(truncated)
```

## The previous round reported

- Done: Implement localLink (and LocalLinkOptions) in packages/client/src/links/localLink.ts and handle query and mutation operations
- Next: Handle subscription operations in localLink (both async iterables and observables, including tracked envelopes) and abort the operation signal on unsubscribe
