## CI reported failures on dbbf05e357a3d2ae892a232a037c709350eb54a8

The build for your last push is red. These checks failed: eslint, spec-names, changelog

Where a failed step is named below, run only that step's command; otherwise map each name to the job that publishes it and run only that job's command.

```
### eslint (failure)

> @re-cinq/hal-engine@0.3.0 eslint
> eslint --max-warnings 0 .


src/providers/vertex/vertexProvider.acceptance.test.ts
  54:53  error  Member chain 'mockVertexAI.mock.calls.map' reaches 3 hops deep (max 2); ask the direct collaborator for what you need                                                                                                                                                                                                                                                                        re-lint/max-member-chain
  75:3   error  Test routes an EU multi-region config end to end without rewriting location or logging apiEndpoint has no spec link — add an inline ([validated by](src/providers/vertex/vertexProvider.acceptance.test.ts#L75)) to the statement it validates in a specs/**/*.md or adrs/**/*.md markdown file (or, if this test isn't tied to a spec statement, it may not belong in the traceable suite)  re-lint/require-spec-link
  99:16  error  Member chain 'mockVertexAI.mock.calls[0]?.[0]' reaches 4 hops deep (max 2); ask the direct collaborator for what you need                                                                                                                                                                                                                                                                    re-lint/max-member-chain

src/providers/vertex/vertexProvider.test.ts
  295:12  error  Member chain 'mockVertexAI.mock.calls.map' reaches 3 hops deep (max 2); ask the direct collaborator for what you need  re-lint/max-member-chain

✖ 4 problems (4 errors, 0 warnings)

### spec-names (failure)

> @re-cinq/hal-engine@0.3.0 spec:names
> node scripts/check-spec-anchor-names.mjs


check-spec-anchor-names: specs/hal-engine-providers/spec.md: names "routes an EU multi-region config end to end without rewriting location or logging apiEndpoint" but points at #L74; it is at #L75

check-spec-anchor-names: 1 finding(s).
Run `npm run spec:names -- --fix` to repoint a citation from the name it carries.

### changelog (failure)

check-changelog: these files under src/ changed since origin/main and CHANGELOG.md did not:
  src/providers/vertex/vertexProvider.ts

Add an entry under ## [Unreleased], written for somebody installing the package.
If the change genuinely is not user-visible, apply the 'no-changelog' label to the pull request.
```

## The previous round reported

- Done: Add apiEndpoint?: string to VertexConfig in src/providers/vertex/vertexProvider.ts with JSDoc naming the EU multi-region host as its motivating case, and pass apiEndpoint through to new VertexAI({...}) with no hardcoded hostname in runtime code.
- Next: Update the Vertex configuration example and prose in specs/hal-engine-providers/spec.md (which replaced docs/providers.md) to show apiEndpoint, state that location alone cannot reach the eu multi-region endpoint, and note that apiEndpoint decides where the request goes while location decides what the request claims.
