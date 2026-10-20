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

## Collecting data

### Before the first run

- **Node 22 or newer**, and `npm install` here.
- **A local clone of the subject** at `subject.mirror_dir` in `experiments/halengine.yaml`. Every run clones from it, so no network is needed once it holds the ticket commits.
- **The CLIs you will vary, logged in on this machine.** A station runs under a scratch HOME that gets only these credentials copied in:

  | Harness | Needs | Copied from |
  |---|---|---|
  | `claude` | `claude` logged in | `~/.claude/.credentials.json` |
  | `codex` | `codex login` done; the bench runs its own pinned codex, not yours | `~/.codex/auth.json` |
  | `gemini` | Vertex AI access: `gcloud auth application-default login`, and the `gemini:` project and location in the experiment file | `~/.config/gcloud/application_default_credentials.json` |

- **For the `lore-mcp` context only:** the Lore API URL and token, as `LORE_API_URL` and `LORE_INGEST_TOKEN` in the environment, or `lore.api-url` and `lore.ingest-token` in git config, plus the `lore_mcp` block in the experiment file.
- **Run outside your home folder.** Runs work under `/var/tmp/loop-bench/runs`, because Claude Code loads `.claude/CLAUDE.md` from every ancestor of its working directory and a run under `~/` would read your personal instructions. `run` refuses to start when an instruction file sits above that folder. Set `LOOP_BENCH_RUNS` to use another folder.

### The steps

```sh
npm run bench -- prepare                          # once: install dependencies for each ticket's base commit
npm run bench -- smoke --harness claude --model claude-sonnet-5-5   # one tiny run: auth, stream parsing, cost
npm run bench -- plan --ticket 93 --station dod   # list the loops a run would start
npm run bench -- run --ticket 93 --station dod --replicates 1
npm run bench -- score                            # dod check and judge scores for the loops that finished
npm run bench -- analyze                          # transcript metrics per station visit
npm run bench -- report                           # rewrite results/<experiment>/REPORT.md
npm run site                                      # rewrite site/data from the same records
```

Run `smoke` once per harness before a batch, so a missing login fails in seconds instead of in the middle of a run.

### Examples, one per harness

```sh
# Claude: dod written by Sonnet 5.5, without Lore
npm run bench -- run --ticket 93 --station dod --agent claude/claude-sonnet-5-5 --context none --replicates 1

# Codex: the same station on a Codex model
npm run bench -- run --ticket 93 --station dod --agent codex/gpt-6-luna --context none --replicates 1

# Gemini: the production baseline for the whole loop on ticket 94
npm run bench -- run --ticket 94 --station baseline --context none --replicates 1

# Claude with the Lore MCP server, three models in one go
npm run bench -- run --ticket 93 --station dod --agent claude/claude-opus-5-5,claude/claude-haiku-5-5 --context lore-mcp --replicates 1
```

`--station` and `--agent` take comma-separated lists. The other filters are `--context`, `--prompt <variant>`, `--replicates <n>` and `--limit <n>`. Without `--context` and `--replicates` a command starts every context in the experiment file and five repeats of each cell, so run `plan` with the same flags first to see exactly which cells it would start.

### Running many at once

```sh
npm run bench -- run --ticket 93 --station dod --parallel 6 --per-harness 3
```

`--parallel` is how many loops run at a time. `--per-harness` caps agent runs per CLI across all loops, which is what keeps one provider's rate limit from sinking the batch. Cells are started breadth-first, so an interrupted batch has covered every model once before it repeats any.

A cell whose `loop.json` exists is skipped, so rerunning the same command resumes. `--force` reruns it, and `--keep-run` keeps the run's working folder under `/var/tmp` for inspection.

### Publishing the results

`npm run site` rewrites `site/data/` and the diff patches. It needs the mirror and the prepared dependency cache, so it runs on your machine, not in CI. Commit the result and push to `main`: the **Publish website** workflow deploys `site/` to GitHub Pages, and **CI** runs the typecheck and tests.

## Adding more

Everything is set in `experiments/halengine.yaml`; add it there, then `plan` to check the cells before you `run` them.

- **A ticket.** Add an entry under `tickets` with the issue number, a `ticket_file`, the merged `reference_pr`, its `merge_sha` and the `base_sha` (the merge's first parent). Run `prepare` so its dependencies are installed.
- **A model.** Add `{ harness, model }` under the station in `variants`. Add `effort: low|medium|high|xhigh|max` to pin the reasoning effort; without it the CLI's own default is used and the report says so. Add the model's price to `src/core/pricing.ts`, or its cost shows as unknown.
- **A prompt variant.** Copy `prompts/<station>/baseline.md` to `prompts/<station>/<name>.md`, edit it, and list `<name>` under `prompt_variants.<station>`.
- **A station or a whole-loop run.** Stations are `dod`, `tdd-round` and `repair-build`; `whole_loop` lists agent combinations to run end to end.
- **A context.** `context_modes` takes `none`, `lore-mcp` and `lore-utopia`.
- **More repeats.** Raise `replicates`. Reports show spread once a cell has more than one run.
- **A different subject repository.** Point `subject` at it and replace `ci_checks` with the CI steps a round can turn red. `format_pattern` names the paths the diffs page formats with the subject's prettier before it compares two branches.
- **A different judge.** Change `judge`. Keep it fixed across a dataset, because a judge that changes mid-run changes the scores.

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
