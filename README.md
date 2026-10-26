# loop-bench

Replays the agent stations of Lore's implementation loop (`dod`, `tdd-round`, `repair-build`) on tickets the loop already merged, and measures each harness, model, prompt and context mode on them: did the loop reach a green build, how many rounds, what it cost, how long it took, and how close the result is to the pull request that was merged.

Each run starts from the merged pull request's first parent, as if the ticket were still open. Agents run as bare `claude`, `gemini` and `codex` CLIs under a scratch HOME that holds credentials and Lore's skill and hook bundle, and nothing else from your machine.

Each cell tests one station on its own: the model under test does that station's work, and the loop ends when the routing would hand over to a different station. A codex `dod` cell never starts Claude or Gemini. [What a cell runs](#what-a-cell-runs) has the details.

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

## What a cell runs

A cell is one ticket, one varied station, one model, one context and one repeat. Only the varied station is under test, so the loop ends as soon as the routing would move to another station:

| Varied station | Starts from | Runs | Ends when |
|---|---|---|---|
| `dod` | the ticket's base commit | the dod station | the dod visit finishes (`station_done`), or it fails twice (`retry_budget`), or it scopes the ticket out (`dod_scoped_out`) |
| `tdd-round` | the ticket's reference dod, `artifacts/<experiment>/<ticket>/dod` | tdd-round, then local CI, repeated | CI is green (`green`), 12 rounds are used (`round_budget`), or CI stays red on the same commit, which would hand over to repair-build (`station_done`) |
| `repair-build` | the ticket's reference red commit, `artifacts/<experiment>/<ticket>/red` | repair-build, then local CI | CI is green (`green`), or CI is red and the loop would hand over to tdd-round (`station_done`) |

The `baseline` and `whole_loop` modes vary nothing and run the full loop with the production model at every station.

Two consequences:

- **A cell needs only the login of the harness it varies.** A codex cell needs `codex login` and nothing from Claude or Gemini. Scoring is separate and needs the judge's login (Gemini on Vertex by default).
- **Cells for different models are comparable.** They all start from the same commit and stop at the same point, whatever the other stations would have done.

The `tdd-round` and `repair-build` cells need their reference artifact first (`make-artifact`, below). `run` fails with the exact command when one is missing.

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

- **Only the harness of the model you are running.** Skip the rows you do not use. `smoke` checks one harness.
- **For scoring:** the judge's login, Gemini on Vertex unless `judge` in the experiment file says otherwise.
- **For the `lore-mcp` context only:** the Lore API URL and token, as `LORE_API_URL` and `LORE_INGEST_TOKEN` in the environment, or `lore.api-url` and `lore.ingest-token` in git config, plus the `lore_mcp` block in the experiment file.
- **Run outside your home folder.** Runs work under `/var/tmp/loop-bench/runs`, because Claude Code loads `.claude/CLAUDE.md` from every ancestor of its working directory and a run under `~/` would read your personal instructions. `run` refuses to start when an instruction file sits above that folder. Set `LOOP_BENCH_RUNS` to use another folder.

### The steps

```sh
npm run bench -- prepare                          # once: install dependencies for each ticket's base commit
npm run bench -- smoke --harness claude --model claude-sonnet-5-5   # one tiny run: auth, stream parsing, cost
npm run bench -- plan --ticket 93 --station dod   # list the loops a run would start
npm run bench -- run --ticket 93 --station dod --replicates 1
npm run bench -- score                            # dod check and judge scores for the loops that finished
npm run bench -- score --missing                  # judge only the loops that have no judge score yet
npm run bench -- analyze                          # transcript metrics per station visit
npm run bench -- report                           # rewrite results/<experiment>/REPORT.md
npm run site                                      # rewrite site/data from the same records
```

Run `smoke` once per harness before a batch, so a missing login fails in seconds instead of in the middle of a run.

`run` scores the dod check when a cell finishes and leaves the judge to a later `score --missing` (or `score --batch submit|status|collect` for one Vertex batch job), so a judge outage never blocks collection. A cell shows `judge later` until then.

### The commands

| Command | What it does |
|---|---|
| `plan [filters]` | Lists the cells a `run` with the same filters would cover, finished ones included. Costs nothing. |
| `prepare` | Installs dependencies once per ticket base commit. |
| `smoke --harness <h> --model <m>` | One tiny run: login, stream parsing, cost. |
| `run [filters]` | Runs the cells that have no `loop.json` yet and scores their dod check. |
| `make-artifact --ticket <n> --kind dod\|red --from-cell <dir>` | Cuts the reference branch that `tdd-round` (`dod`) or `repair-build` (`red`) cells start from. |
| `score [filters]` | Recomputes the dod check and the judge on finished cells. |
| `score --missing [--shard i/n]` | Judges only the cells without a judge score, found on disk. |
| `truncate [--ticket <n>] [--apply]` | Cuts finished cells where a cell now ends (see below). Dry run without `--apply`. |
| `analyze`, `report`, `site`, `site-deps`, `propose` | Analysis, report and website. |

Filters: `--ticket`, `--station`, `--agent <harness/model>`, `--context`, `--prompt`, `--replicates`, `--limit`.

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

A cell whose `loop.json` exists is skipped, so rerunning the same command resumes. `--force` reruns it, and `--keep-run` keeps the run's working folder under `/var/tmp` for inspection. A run never writes over a cell folder: whatever an earlier run left there, a cut-short loop or a forced cell, moves to `artifacts/replaced/<cell>/<timestamp>` first, so nothing paid for is deleted.

#### One model at a time, cheapest first

To collect one harness without touching the others, run its models one after another with the same flags. This is what a Codex pass looks like, cheapest list price first:

```sh
for model in gpt-6-luna gpt-5.6-luna gpt-6.1-sol gpt-6-sol gpt-5.6-terra gpt-5.6-sol gpt-6-astra; do
  npm run bench -- run --agent codex/$model --context none --replicates 5 --parallel 3 --per-harness 3
done
```

Prices are in `src/core/pricing.ts`. Run the loop in a terminal, `tmux` or a background task: a batch of 60 or more cells takes hours. Add `--context lore-mcp` or `lore-utopia` in a second pass, once `none` is complete, because each context multiplies the cell count.

#### When a batch stops by itself

A batch stops, and leaves the current cell unrun, when a station fails for a reason that is not the model's: an expired login, for example. The log says `stopping: <station> on <harness>/<model> hit an infrastructure error; see <path>/stderr.log`. Read that file, fix the cause (usually `claude`, `codex login` or `gcloud auth application-default login`), run `smoke` for that harness, then rerun the same command: finished cells are skipped.

To tell whether a batch is still alive, use `pgrep -f "cli[.]ts run"`. The brackets keep the command from matching itself.

`run ... --exclude claude[,gemini]` ends a loop before any step assigned to those CLIs. Cells that vary one station already stop at the station boundary, so this only matters for `baseline` and `whole_loop` runs.

### Publishing the results

The website rebuilds itself: the **Publish website** workflow runs on every push to `main` that touches `results/`, `site/`, `src/` or `experiments/`. It clones the subject repository, installs the prettier each ticket pins (`site-deps`), runs `site` and deploys the result to GitHub Pages, so a results commit is enough. **CI** runs the typecheck and tests.
`npm run site` does the same locally and writes `site/data/`, which you can commit as a fallback. Locally it uses the prettier in the dependency cache; `npm run bench -- site-deps` installs the missing ones.

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
5. Routes the next visit as `implementation-loop.yaml` does: 12 rounds, 2 repairs and one retry per station at most. A cell that varies one station ends where that routing would hand over to another station (`station_done`), as [What a cell runs](#what-a-cell-runs) describes. `baseline` and `whole_loop` cells follow the routing to the end.

## The matrix

`experiments/halengine.yaml` names the subject, the tickets, the production baseline per station and what to vary. One factor changes at a time:

- **Model variants**: each station is run with every listed model, on its own: the loop stops where it would hand over to another station, so the other stations' models never run. A varied `tdd-round` or `repair-build` starts from a fixed reference branch, so its comparison does not depend on how dod went. Make one with `make-artifact --kind dod|red --from-cell <cell>`.
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

`loop.json` has an `end_reason`: `green`, `station_done`, `round_budget`, `repair_budget`, `retry_budget`, `dod_scoped_out` or `excluded_harness`. "Reached green" in the report is only meaningful for `tdd-round` and `repair-build` cells, because a `dod` cell never runs CI.

### Cutting cells that ran past their station

Cells collected before the stop-at-the-station rule kept running into the next stations. `truncate` brings them in line without rerunning anything. Each visit keeps its own cost, time, tokens and commit, so the command replays the routing over the recorded visits, keeps the ones up to the cut, and rebuilds `loop.json`, the branch bundle, `diff.patch` and `dod.md` at that commit.

```sh
npm run bench -- truncate                 # dry run: one line per cell it would cut
npm run bench -- truncate --ticket 95 --apply   # cut one ticket first
npm run bench -- truncate --apply         # cut them all
npm run bench -- score                    # recompute the dod check; the judge follows with score --missing
```

Everything it replaces moves to `artifacts/replaced/<cell>/<timestamp>-before-cut/`: the old `loop.json`, bundle, patch, dod and score files, and the dropped station visits. The dropped visits stay in `results.jsonl`, so the per-station tables still count them. A cut cell has no dod check or judge score until it is scored again. Running `truncate` twice changes nothing the second time.

## Scores

- **dod check**: the agent's acceptance tests must fail on the base commit and pass once the merged pull request's production code is applied. It is deterministic.
- **Structural**: lines and files changed, and the overlap of the file set with the merged pull request's.
- **Judge**: a fixed model (`judge` in the experiment file) scores correctness, completeness against the issue and closeness to the merged pull request from 1 to 5. `run` does not call it: a finished loop gets its dod check right away and its judge score later, from `score --missing` or `score --batch`.

### Judging in a batch

With a gemini judge, many loops can be judged as one Vertex batch job instead of one CLI call after another. Add a bucket folder to the experiment file (and a `location` if batch prediction is not served from the gemini one):

```yaml
judge: { harness: gemini, model: gemini-4-argon, batch: { gcs_prefix: gs://your-bucket/loop-bench-judge } }
```

```sh
npm run bench -- score --batch submit    # one request per distinct prompt, for every loop without a judge score
npm run bench -- score --batch status    # the state of each open job
npm run bench -- score --batch collect   # writes judge.json, loop.json and results.jsonl for each answered cell
```

It needs `gcloud` logged in (`gcloud auth application-default login`). Open jobs are tracked in `results/<experiment>/judge-batches.json`. Cells whose answer did not parse stay without a judge score, and the next `submit` sends them again. The prompt and the scoring are the same as for the CLI judge.

## Improving the prompts

`analyze` writes `analysis.json` beside every visit: tool calls by kind, guard refusals, reinstalls and builds, test runs, repeated reads, Lore tool calls and the first edit. `propose --station <s>` hands the worst visits and the station prompt to the judge model and writes suggested edits to `proposals/`. A person turns a proposal into `prompts/<station>/<name>.md`, lists it under `prompt_variants`, and runs it again. Nothing edits `baseline.md`; `scripts/sync-prompts.ts <lore checkout>` refreshes it from lore and records the commit in `prompts/LORE_SHA`.

## Known differences from production

- The pod's `/workspace` paths are rewritten to the run directory, and the header above the prompt approximates the floor's.
- Local CI is one Node version on one machine, not GitHub's runners.
- The pods pin codex 0.142.5, which the gpt-5.6 and gpt-6 models refuse, so the bench runs its own pinned codex 0.163.0.
- Codex has no hook bundle, so the Lore guard does not stop it from running the full suite.
- In the `lore-mcp` arm the Lore memory holds episodes from the real runs on these tickets, so it can surface the actual solution.
- OpenAI prices in `src/core/pricing.ts` must be checked against the published list before a write-up.
