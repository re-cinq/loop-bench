# loop-bench

loop-bench replays the agent stations of Lore's implementation loop (`dod`, `tdd-round`, `repair-build`) on tickets the loop already merged. For each harness, model, prompt and context mode, it measures whether the loop reached a green build, how many rounds it took, what it cost, how long it ran, and how close the result is to the merged pull request.

Each run starts from the merged pull request's first parent, as if the ticket were still open. Agents run as bare `claude`, `gemini` and `codex` CLIs under a scratch HOME that holds only credentials and Lore's skill and hook bundle.

- [Quick start](#quick-start)
- [How a cell works](#how-a-cell-works)
- [Before the first run](#before-the-first-run)
- [Running cells](#running-cells)
- [Results and scores](#results-and-scores)
- [Adding more](#adding-more)
- [Known differences from production](#known-differences-from-production)

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

`run` skips a cell whose `loop.json` already exists, so rerunning an interrupted batch resumes it. `--force` reruns a cell.

## How a cell works

A cell is one ticket, one varied station, one model, one context and one repeat. Only the varied station runs under the model being tested. The loop ends as soon as the routing would hand over to another station, so a codex `dod` cell never starts Claude or Gemini.

| Varied station | Starts from | Runs | Ends when |
|---|---|---|---|
| `dod` | the ticket's base commit | the dod station | it finishes (`station_done`), fails twice (`retry_budget`), or scopes the ticket out (`dod_scoped_out`) |
| `tdd-round` | the reference dod, `artifacts/<experiment>/<ticket>/dod` | tdd-round, then local CI, repeated | CI is green (`green`), 12 rounds are used (`round_budget`), or CI stays red on the same commit (`station_done`) |
| `repair-build` | the reference red commit, `artifacts/<experiment>/<ticket>/red` | repair-build, then local CI | CI is green (`green`), or red and would go back to tdd-round (`station_done`) |

The `baseline` and `whole_loop` modes vary nothing and run the full loop with the production model at every station.

This has two effects. A cell only needs the login of the harness it varies. And cells for different models are comparable, because they all start from the same commit and stop at the same point.

`tdd-round` and `repair-build` cells need a reference branch first. Cut one with `make-artifact --ticket <n> --kind dod|red --from-cell <dir>`. If it is missing, `run` fails and prints the command to run.

Step by step, a run:

1. Clones the subject into a bare `origin.git` whose `main` is the base commit, plus a working clone on `loop-bench/<ticket>`. Pushes and fetches stay local; nothing reaches GitHub.
2. Builds the prompt from `prompts/<station>/<variant>.md`. `baseline.md` is the production prompt copied verbatim from lore.
3. Runs the CLI with the station's deadline and environment, and reads the `LORE_NODE_RESULT` line, tokens and cost from its stream.
4. Between rounds, runs the subject's CI on the pushed head and writes `round-brief.md` the way Lore's await-ci step does.
5. Routes the next visit as `implementation-loop.yaml` does: at most 12 rounds, 2 repairs and one retry per station.

## Before the first run

- **Node 22 or newer**, and `npm install` in this folder.
- **A local clone of the subject** at `subject.mirror_dir` in `experiments/halengine.yaml`. Every run clones from it, so no network is needed once it has the ticket commits.
- **A login for each harness you vary.** Skip the rows you don't use:

  | Harness | Needs | Copied from |
  |---|---|---|
  | `claude` | `claude` logged in | `~/.claude/.credentials.json` |
  | `codex` | `codex login`; the bench runs its own pinned codex | `~/.codex/auth.json` |
  | `gemini` | `gcloud auth application-default login`, plus the `gemini:` project and location in the experiment file | `~/.config/gcloud/application_default_credentials.json` |

- **For scoring:** the judge's login, which is Gemini on Vertex unless `judge` in the experiment file says otherwise.
- **For the `lore-mcp` context:** `LORE_API_URL` and `LORE_INGEST_TOKEN` in the environment (or `lore.api-url` and `lore.ingest-token` in git config), and the `lore_mcp` block in the experiment file.
- **A runs folder outside your home.** Runs go to `/var/tmp/loop-bench/runs` because Claude Code reads `.claude/CLAUDE.md` from every parent folder, and a run under `~/` would pick up your personal instructions. `run` refuses to start if it finds one. Set `LOOP_BENCH_RUNS` to use another folder.

Run `smoke` once per harness before a batch, so a missing login fails in seconds rather than halfway through.

## Running cells

### Commands

| Command | What it does |
|---|---|
| `plan [filters]` | Lists the cells a `run` with the same filters would cover. Costs nothing. |
| `prepare` | Installs dependencies once per ticket base commit. |
| `smoke --harness <h> --model <m>` | One tiny run to check login, stream parsing and cost. |
| `run [filters]` | Runs cells that have no `loop.json` yet and scores their dod check. |
| `make-artifact --ticket <n> --kind dod\|red --from-cell <dir>` | Cuts the reference branch that `tdd-round` (`dod`) or `repair-build` (`red`) cells start from. |
| `score [filters]` | Recomputes the dod check and judge score on finished cells. |
| `score --missing [--shard i/n]` | Judges only the cells without a judge score. |
| `score --batch submit\|status\|collect` | Judges many cells as one Vertex batch job (see [Scores](#scores)). |
| `truncate [--ticket <n>] [--apply]` | Cuts old cells that ran past their station. Dry run without `--apply`. |
| `analyze`, `report`, `site`, `site-deps`, `propose` | Analysis, report and website. |

Filters: `--ticket`, `--station`, `--agent <harness/model>`, `--context`, `--prompt`, `--replicates`, `--limit`. `--station` and `--agent` take comma-separated lists.

Without `--context` and `--replicates`, a command runs every context in the experiment file with five repeats each. Run `plan` with the same flags first to see what it will start.

### Examples

```sh
# Claude: dod written by Sonnet 5.5, without Lore
npm run bench -- run --ticket 93 --station dod --agent claude/claude-sonnet-5-5 --context none --replicates 1

# Codex: the same station on a Codex model
npm run bench -- run --ticket 93 --station dod --agent codex/gpt-6-luna --context none --replicates 1

# Gemini: the production baseline for the whole loop on ticket 94
npm run bench -- run --ticket 94 --station baseline --context none --replicates 1

# Claude with the Lore MCP server, two models in one go
npm run bench -- run --ticket 93 --station dod --agent claude/claude-opus-5-5,claude/claude-haiku-5-5 --context lore-mcp --replicates 1
```

### Batches

```sh
npm run bench -- run --ticket 93 --station dod --parallel 6 --per-harness 3
```

`--parallel` sets how many loops run at once. `--per-harness` caps concurrent runs per CLI, which keeps one provider's rate limit from sinking the batch. Cells start breadth-first, so an interrupted batch has covered every model once before it repeats any.

To collect one harness at a time, cheapest first (prices are in `src/core/pricing.ts`):

```sh
for model in gpt-6-luna gpt-5.6-luna gpt-6.1-sol gpt-6-sol gpt-5.6-terra gpt-5.6-sol gpt-6-astra; do
  npm run bench -- run --agent codex/$model --context none --replicates 5 --parallel 3 --per-harness 3
done
```

A batch of 60 or more cells takes hours, so run it in `tmux` or a background task. Do `--context none` first; each extra context multiplies the cell count.

Other flags:

- `--keep-run` keeps the run's working folder under `/var/tmp` for inspection.
- `--exclude claude[,gemini]` ends a loop before any step assigned to those CLIs. It only matters for `baseline` and `whole_loop` runs.

A run never overwrites a cell folder. Anything already there moves to `artifacts/replaced/<cell>/<timestamp>` first.

### When a batch stops

A batch stops when a station fails for a reason that is not the model's, such as an expired login. The log says:

```
stopping: <station> on <harness>/<model> hit an infrastructure error; see <path>/stderr.log
```

Read that file, fix the login (`claude`, `codex login` or `gcloud auth application-default login`), run `smoke` for that harness, and rerun the same command. Finished cells are skipped.

To check whether a batch is still running: `pgrep -f "cli[.]ts run"`.

## Results and scores

### Where results land

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

Compare two cells with `diff -r`.

`loop.json` has an `end_reason`: `green`, `station_done`, `round_budget`, `repair_budget`, `retry_budget`, `dod_scoped_out` or `excluded_harness`. "Reached green" only means something for `tdd-round` and `repair-build` cells, because a `dod` cell never runs CI.

### Scores

| Score | What it measures |
|---|---|
| dod check | The agent's acceptance tests fail on the base commit and pass with the merged production code. Deterministic. |
| Structural | Lines and files changed, and how much the file set overlaps the merged pull request's. |
| Judge | A fixed model (`judge` in the experiment file) rates correctness, completeness and closeness to the merged pull request from 1 to 5. |

`run` scores the dod check right away and leaves the judge for later, so a judge outage never blocks collection. Such a cell shows `judge later` until you run `score --missing`.

With a Gemini judge you can judge many cells as one Vertex batch job. Add a bucket to the experiment file (and a `location` if batch prediction isn't served from the Gemini one):

```yaml
judge: { harness: gemini, model: gemini-4-argon, batch: { gcs_prefix: gs://your-bucket/loop-bench-judge } }
```

```sh
npm run bench -- score --batch submit    # one request per prompt, for every cell without a judge score
npm run bench -- score --batch status    # state of each open job
npm run bench -- score --batch collect   # writes judge.json, loop.json and results.jsonl
```

Open jobs are tracked in `results/<experiment>/judge-batches.json`. Cells whose answer didn't parse are sent again on the next `submit`.

### Old cells that ran past their station

Cells collected before the stop-at-the-station rule kept running into later stations. `truncate` replays the routing over the recorded visits and rebuilds `loop.json`, the bundle, `diff.patch` and `dod.md` at the cut, without rerunning anything.

```sh
npm run bench -- truncate                       # dry run
npm run bench -- truncate --ticket 95 --apply   # one ticket
npm run bench -- truncate --apply               # all
npm run bench -- score                          # then score --missing for the judge
```

Replaced files move to `artifacts/replaced/<cell>/<timestamp>-before-cut/`. Dropped visits stay in `results.jsonl`. Running it twice changes nothing the second time.

### Improving the prompts

`analyze` writes `analysis.json` for every visit: tool calls by kind, guard refusals, builds, test runs, repeated reads, Lore tool calls and the first edit. `propose --station <s>` gives the worst visits and the station prompt to the judge model and writes suggested edits to `proposals/`. A person turns a proposal into `prompts/<station>/<name>.md` and lists it under `prompt_variants`. Nothing edits `baseline.md`; `scripts/sync-prompts.ts <lore checkout>` refreshes it from lore and records the commit in `prompts/LORE_SHA`.

### Publishing

The **Publish website** workflow runs on every push to `main` that touches `results/`, `site/`, `src/` or `experiments/`. It installs the prettier each ticket pins, runs `site`, and deploys to GitHub Pages, so committing results is enough. **CI** runs the typecheck and tests.

Locally, `npm run site` writes `site/data/` and `npm run serve` serves it on port 8080. `npm run bench -- site-deps` installs any missing prettier versions.

## Adding more

Everything lives in `experiments/halengine.yaml`. Edit it, then run `plan` to check the cells.

| To add | Do this |
|---|---|
| A ticket | Add an entry under `tickets` with the issue number, `ticket_file`, `reference_pr`, `merge_sha` and `base_sha` (the merge's first parent). Run `prepare`. |
| A model | Add `{ harness, model }` under the station in `variants`. Optionally add `effort: low\|medium\|high\|xhigh\|max`. Add its price to `src/core/pricing.ts` or cost shows as unknown. |
| A prompt variant | Copy `prompts/<station>/baseline.md` to `prompts/<station>/<name>.md`, edit it, and list `<name>` under `prompt_variants.<station>`. |
| A whole-loop run | List agent combinations under `whole_loop`. |
| A context | `context_modes` takes `none`, `lore-mcp` and `lore-utopia`. |
| More repeats | Raise `replicates`. Reports show spread once a cell has more than one run. |
| Another subject repo | Point `subject` at it and replace `ci_checks`. `format_pattern` names the paths the diffs page formats before comparing. |
| Another judge | Change `judge`, and keep it fixed across a dataset. |

## Known differences from production

- The pod's `/workspace` paths are rewritten to the run directory, and the prompt header only approximates the floor's.
- Local CI is one Node version on one machine, not GitHub's runners.
- The pods pin codex 0.142.5, which the gpt-5.6 and gpt-6 models refuse, so the bench runs codex 0.163.0.
- Codex has no hook bundle, so the Lore guard can't stop it from running the full suite.
- In the `lore-mcp` arm, Lore memory holds episodes from the real runs on these tickets, so it can surface the actual solution.
- OpenAI prices in `src/core/pricing.ts` need checking against the published list before a write-up.
