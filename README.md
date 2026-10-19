# loop-bench

Replays the agent stations of Lore's implementation loop (`dod`, `tdd-round`, `repair-build`) on tickets the loop already merged, and measures each harness, model, prompt and context mode on them: did the loop reach a green build, how many rounds, what it cost, how long it took, and how close the result is to the pull request that was merged.

Each run starts from the merged pull request's first parent, as if the ticket were still open. Agents run as bare `claude`, `gemini` and `codex` CLIs under a scratch HOME that holds credentials and Lore's skill and hook bundle, and nothing else from your machine.

## Quick start

```sh
npm install
npm run bench -- prepare                    # install dependencies once per ticket base commit
npm run bench -- smoke --harness gemini --model gemini-3-flash-preview
npm run bench -- plan --ticket 93 --station dod --replicates 1
npm run bench -- run  --ticket 93 --station dod --context none
npm run bench -- score --ticket 93 --station dod
npm run bench -- analyze
npm run bench -- report > docs/halengine-results.md
```

`run` skips a cell whose `loop.json` already exists, so an interrupted batch resumes where it stopped. `--force` reruns it.

## What a run does

1. Clones the subject into a bare `origin.git` whose `main` is the ticket's base commit, and a working clone on `loop-bench/<ticket>` beside `ticket.md`. The prompts' `git push origin HEAD` and `git fetch origin main` work offline against it, and nothing reaches GitHub.
2. Builds the station prompt from `prompts/<station>/<variant>.md`. `baseline.md` is the production prompt copied verbatim from lore; only `{ticket_path}` and the pod's `/workspace` paths are filled in.
3. Runs the CLI with the station's deadline and environment (`LORE_ACCEPTANCE_DOD` on tdd-round) and reads the `LORE_NODE_RESULT` line, tokens and cost from its stream.
4. Between rounds, runs the subject's CI commands on the pushed head and writes `round-brief.md` exactly as Lore's await-ci wait does.
5. Routes the next visit as `implementation-loop.yaml` does: 12 rounds, 2 repairs and one retry per station at most.

## The matrix

`experiments/halengine.yaml` names the subject, the tickets, the production baseline per station and what to vary. One factor changes at a time:

- **Model variants**: each station is run with every listed model while the other stations stay at baseline. A varied `tdd-round` or `repair-build` starts from a fixed reference branch, so its comparison does not depend on how dod went. Make one with `make-artifact --kind dod|red --from-cell <cell>`.
- **Prompt variants**: hand-written files beside `baseline.md`, run on the baseline model.
- **Context modes**: `none`, or `lore-mcp`, the Lore MCP server over stdio as `install.sh` registers it. Its API URL and token come from the environment or from git config (`lore.api-url`, `lore.ingest-token`).
- **Replicates**: every cell runs five times by default, so the report can show spread.

## Where results land

```
results/<experiment>/<ticket>/<station varied>/<harness>-<model>/<context>/rep-<n>/
  loop.json         outcome, rounds, cost, time, tokens, scores
  diff.patch        the branch against the base commit
  dod.md            .lore/dod.md as the loop left it
  branch.bundle     the branch itself
  dod-check.json    acceptance tests red on base, green with the merged code
  judge.json        the judge's scores and rationale
  stations/<nn>-<station>-r<round>-a<attempt>/
    prompt.md  stdout.jsonl  stderr.log  final-message.md  record.json  ci-verdict.json  analysis.json
results/<experiment>/results.jsonl   every record, the report's input
```

Two cells compare with `diff -r`.

## Scores

- **dod check**: the agent's acceptance tests must fail on the base commit and pass once the merged pull request's production code is applied. It is deterministic.
- **Structural**: lines and files changed, and the overlap of the file set with the merged pull request's.
- **Judge**: a fixed model (`judge` in the experiment file) scores correctness, completeness against the issue and closeness to the merged pull request from 1 to 5.

## Improving the prompts

`analyze` writes `analysis.json` beside every visit: tool calls by kind, guard refusals, reinstalls and builds, test runs, repeated reads, Lore tool calls and the first edit. `propose --station <s>` hands the worst visits and the station prompt to the judge model and writes suggested edits to `proposals/`. A person turns a proposal into `prompts/<station>/<name>.md`, lists it under `prompt_variants`, and runs it again. Nothing edits `baseline.md`; `scripts/sync-prompts.ts <lore checkout>` refreshes it from lore and records the commit in `prompts/LORE_SHA`.

## Known differences from production

- The pod's `/workspace` paths are rewritten to the run directory, and the header above the prompt approximates the floor's.
- Local CI is one Node version on one machine, not GitHub's runners.
- The pods pin codex 0.142.5, which the gpt-5.6 and gpt-6 models refuse, so the bench runs its own pinned codex 0.163.0.
- Codex has no hook bundle, so the Lore guard does not stop it from running the full suite.
- In the `lore-mcp` arm the Lore memory holds episodes from the real runs on these tickets, so it can surface the actual solution.
- OpenAI prices in `src/core/pricing.ts` must be checked against the published list before a write-up.
