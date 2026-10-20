# Definition of Done

> It would be great to have a `LocalLink` that allows me to do:
> This would directly run the router in the same process as the client instead of transferring requests to a server.
>
> ```ts
> import { createRouter } from '../path/to/server/trpc';
>
> const client = createTRPCProxyClient<ReturnType<typeof createRouter>>({
>   links: [localLink({ router: createRouter({ database }) })],
> });
> ```

**Strategy: `direct`** — `@trpc/client` already provides `createTRPCClient` and the `TRPCLink` chain interface, and `@trpc/server` provides `callTRPCProcedure` / router execution primitives, so acceptance tests can call `createTRPCClient` with `localLink` directly and fail because `localLink` is not yet implemented or exported.

## Done when these pass

- [x] **`localLink runs query and mutation procedures in the same process as the client`** — `localLink({ router })` executes `query` and `mutation` procedures directly against the router in the same process without transferring requests to a server. ([validated by localLink runs query and mutation procedures in the same process as the client](packages/tests/server/localLink.acceptance.test.ts#L6))
- [x] **`localLink supports createContext and propagates errors as TRPCClientError`** — `localLink` supports `createContext` when calling procedures and converts thrown procedure errors into `TRPCClientError` instances on the client. ([validated by localLink supports createContext and propagates errors as TRPCClientError](packages/tests/server/localLink.acceptance.test.ts#L35))
- [x] **`localLink runs subscription procedures in the same process and cleans up on unsubscribe`** — `localLink` executes `subscription` procedures in-process, forwards emitted items to `onData`, and aborts/cleans up the subscription when unsubscribed. ([validated by localLink runs subscription procedures in the same process and cleans up on unsubscribe](packages/tests/server/localLink.acceptance.test.ts#L69))

## Facets

- [x] Implement `localLink` (and `LocalLinkOptions`) in `packages/client/src/links/localLink.ts` supporting `router`, optional/required `createContext` (via `CreateContextCallback`), optional `onError`, and `TransformerOptions`.
- [x] Handle `query` and `mutation` operations in `localLink` by resolving context, calling the router procedure in-process, applying any configured data transformer, and emitting the result or `TRPCClientError`.
- [x] Handle `subscription` operations in `localLink` (both async iterables and observables, including `tracked` envelopes) and abort the operation signal on unsubscribe.
- [x] Export `localLink` (and its options type) from `@trpc/client` (`packages/client/src/links.ts` and `packages/client/rollup.config.ts` / entrypoints if applicable).
- [x] Export `ssrLink` as an alias for `localLink`.

## Out of scope

- Network transport, HTTP batching, or WebSocket connection management.
- Modifying server adapters (`express`, `fastify`, `fetch`, `next`, `ws`, `standalone`).