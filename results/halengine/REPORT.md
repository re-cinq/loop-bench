# Which model runs each implementation-loop station best

**For people choosing the model behind one of Lore's agents.** Results of `halengine` as of 2026-10-19 16:35 UTC: 35 loops over 35 cells on re-cinq/HALEngine, prompts from lore `aa562bb4`.

## Why we measured

The implementation loop's stations (`dod`, `tdd-round`, `repair-build`) each run on a model nobody chose by measurement. This bench replays merged tickets from their base commit with each harness and model, with and without the Lore MCP server, and repeats every cell so a lucky run shows as spread rather than as a rank.

## Results

Each row is one cell: one station varied against the production baseline, every other station at baseline. Rows are sorted by model name; cells that have not finished a loop yet show as running or not run yet. Values are the mean over the cell's runs, with min–max and standard deviation in parentheses.

| Ticket | Station varied | Model (CLI) | Effort | Lore | Prompt | Runs | Reached green | Rounds | Cost per loop | Time per loop | Judge correctness | Judge completeness | Judge closeness | dod red→green | Files (Jaccard vs PR) | +/− lines |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| #93 | baseline | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 4.0 | $6.04 | 30.8 min | 4.0 | 4.0 | 3.0 | 1/1 | 11 (0.50) | +195/−47 |
| #93 | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 1 | 1/1 | 1.0 | $3.34 | 10.9 min | 4.0 | 4.0 | 4.0 | 1/1 | 7 (0.27) | +165/−6 |
| #93 | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 1 | 1/1 | 1.0 | $4.96 | 20.2 min | 4.0 | 4.0 | 4.0 | 1/1 | 13 (0.43) | +213/−48 |
| #93 | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 1 | 1/1 | 3.0 | $7.55 | 37.1 min | 5.0 | 4.0 | 3.0 | 1/1 | 11 (0.50) | +277/−35 |
| #93 | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | running | — | — | — | — | — | — | — | — | — |
| #93 | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 1 | 1/1 | 2.0 | $5.23 | 103.8 min | 5.0 | 4.0 | 3.0 | 1/1 | 11 (0.50) | +194/−40 |
| #93 | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 1/1 | 2.0 | $4.79 | 100.2 min | 4.0 | 5.0 | 4.0 | 0/1 | 9 (0.45) | +185/−18 |
| #93 | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 1 | 1/1 | 1.0 | $4.34 | 19.5 min | 5.0 | 5.0 | 4.0 | 1/1 | 13 (0.54) | +190/−48 |
| #93 | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 1 | 1/1 | 3.0 | $5.19 | 27.4 min | 5.0 | 4.0 | 4.0 | 1/1 | 11 (0.50) | +164/−43 |
| #93 | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 1 | 1/1 | 2.0 | $2.11 | 9.2 min | 4.0 | 4.0 | 4.0 | 1/1 | 8 (0.36) | +153/−8 |
| #93 | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 1 | 1/1 | 2.0 | $4.90 | 46.0 min | 5.0 | 4.0 | 4.0 | 1/1 | 11 (0.29) | +194/−38 |
| #93 | dod | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 1.0 | $1.91 | 11.1 min | 4.0 | 4.0 | 4.0 | 1/1 | 7 (0.27) | +152/−4 |
| #93 | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $3.99 | 22.7 min | 5.0 | 4.0 | 4.0 | 1/1 | 11 (0.50) | +199/−44 |
| #93 | dod | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 4.0 | $8.50 | 40.6 min | 4.0 | 5.0 | 4.0 | 1/1 | 13 (0.43) | +255/−57 |
| #93 | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $2.64 | 12.5 min | 4.0 | 4.0 | 4.0 | 1/1 | 7 (0.27) | +153/−7 |
| #93 | dod | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 1.0 | $2.34 | 11.8 min | 5.0 | 4.0 | 4.0 | 1/1 | 8 (0.36) | +177/−9 |
| #93 | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $4.35 | 23.4 min | 5.0 | 4.0 | 4.0 | 1/1 | 9 (0.45) | +201/−12 |
| #93 | dod | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | running | — | — | — | — | — | — | — | — | — |
| #93 | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 3.0 | $4.55 | 20.2 min | 4.0 | 4.0 | 4.0 | 1/1 | 9 (0.60) | +173/−20 |
| #93 | dod | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 1.0 | $1.40 | 10.2 min | 4.0 | 4.0 | 3.0 | 1/1 | 7 (0.27) | +165/−7 |
| #93 | dod | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 0 | running | — | — | — | — | — | — | — | — | — |
| #93 | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 1.0 | $3.60 | 15.6 min | 4.0 | 4.0 | 4.0 | 1/1 | 8 (0.36) | +154/−14 |
| #93 | dod | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $4.36 | 28.2 min | 5.0 | 5.0 | 4.0 | 1/1 | 8 (0.25) | +177/−9 |
| #93 | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 1 | 1/1 | 3.0 | $3.09 | 35.0 min | 4.0 | 3.0 | 3.0 | 1/1 | 11 (0.50) | +204/−51 |
| #93 | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 3.0 | $6.49 | 38.3 min | 4.0 | 5.0 | 3.0 | 0/1 | 13 (0.43) | +222/−44 |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | no-traceability | 0 | running | — | — | — | — | — | — | — | — | — |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | short | 0 | running | — | — | — | — | — | — | — | — | — |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 1 | 1/1 | 3.0 | $7.05 | 56.7 min | 3.0 | 5.0 | 3.0 | 0/1 | 14 (0.40) | +242/−50 |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 1 | 1/1 | 2.0 | $5.49 | 26.6 min | 4.0 | 4.0 | 3.0 | 1/1 | 11 (0.50) | +204/−38 |
| #93 | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 1 | 1/1 | 1.0 | $3.23 | 14.9 min | 5.0 | 5.0 | 4.0 | 1/1 | 9 (0.45) | +142/−12 |
| #93 | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 3.0 | $6.44 | 29.7 min | 5.0 | 4.0 | 4.0 | 1/1 | 12 (0.58) | +235/−44 |
| #93 | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 5.0 | $0.21 | 8.9 min | 5.0 | 5.0 | 4.0 | — | 13 (0.54) | +183/−47 |
| #93 | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 3.0 | $2.39 | 7.9 min | 5.0 | 5.0 | 4.0 | — | 15 (0.47) | +240/−49 |
| #93 | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 3.0 | $1.17 | 13.5 min | 5.0 | 5.0 | 4.0 | — | 10 (0.70) | +188/−57 |
| #93 | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $0.82 | 1.0 min | 1.0 | 1.0 | 1.0 | — | 3 (0.11) | +117/−0 |
| #93 | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 8.0 | $0.12 | 12.4 min | 5.0 | 5.0 | 4.0 | — | 12 (0.58) | +172/−24 |
| #93 | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $1.08 | 8.1 min | 5.0 | 5.0 | 4.0 | — | 11 (0.50) | +217/−10 |
| #93 | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $0.19 | 0.9 min | 1.0 | 1.0 | 1.0 | — | 3 (0.11) | +117/−0 |
| #93 | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 5.0 | $1.19 | 15.8 min | 5.0 | 5.0 | 4.0 | — | 12 (0.58) | +307/−61 |
| #93 | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 2.0 | $4.44 | 23.2 min | 5.0 | 5.0 | 5.0 | — | 11 (0.64) | +198/−23 |

What the columns mean:

- **Effort**: the reasoning effort the varied agent ran at. Where the experiment set none, the CLI's default applies, inferred because no CLI reports it: claude code's documented default (high, medium on Opus 5.5, Sonnet 5.5 and Haiku 5.5; Haiku 4.5 has no thinking), the level gemini-cli 0.62 sends (high for the Gemini 3 models, nothing for Gemini 4 Argon, which then runs at the API's medium), and codex's per-model default from its model list.
- **Reached green**: the loop ended with the subject's CI checks passing on the pushed branch.
- **Rounds**: tdd rounds the loop spent (12 is the budget).
- **Cost**: every model's token counts at its standard market price per million tokens, read 2026-10-19 (`src/core/pricing.ts`). No launch or promotional discounts: Gemini 4 Argon is priced at its December rate and gpt-5.6-sol at its pre-promotion rate, so the numbers hold for a long-term decision. Claude and Codex runs used subscriptions; their dollar figures are what the same tokens cost on the API.
- **Judge**: a fixed model's 1–5 scores against the issue and the merged pull request.
- **dod red→green**: the agent's acceptance tests failed on the base commit and passed once the merged pull request's production code was applied.
- **Files (Jaccard vs PR)**: files the branch touched, and the overlap of that set with the merged pull request's.

### How the loops ended

| Ticket | Station varied | Model (CLI) | Lore | How the loops ended |
|---|---|---|---|---|
| #93 | baseline | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×1 |
| #93 | dod | `claude-fable-5-1` (claude) | with Lore | green ×1 |
| #93 | dod | `claude-fable-5-1` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-haiku-4-5-20251001` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-haiku-5-5` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-opus-5-5` (claude) | with Lore | green ×1 |
| #93 | dod | `claude-opus-5-5` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-sonnet-4-6` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-sonnet-5-5` (claude) | with Lore | green ×1 |
| #93 | dod | `claude-sonnet-5-5` (claude) | without Lore | green ×1 |
| #93 | dod | `gpt-5.6-luna` (codex) | with Lore | green ×1 |
| #93 | dod | `gpt-5.6-luna` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-5.6-sol` (codex) | with Lore | green ×1 |
| #93 | dod | `gpt-5.6-sol` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-5.6-terra` (codex) | with Lore | green ×1 |
| #93 | dod | `gpt-5.6-terra` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-6-astra` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-6-luna` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-6-sol` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-6.1-sol` (codex) | without Lore | green ×1 |
| #93 | dod | `gemini-3-flash-preview` (gemini) | with Lore | green ×1 |
| #93 | dod | `gemini-3-flash-preview` (gemini) | without Lore | green ×1 |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×1 |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×1 |
| #93 | dod | `gemini-4-argon` (gemini) | with Lore | green ×1 |
| #93 | dod | `gemini-4-argon` (gemini) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-5.6-sol` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-5.6-terra` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-6-astra` (codex) | without Lore | retry_budget ×1 |
| #93 | tdd-round | `gpt-6-luna` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-6-sol` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-6.1-sol` (codex) | without Lore | retry_budget ×1 |
| #93 | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×1 |
| #93 | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×1 |

## What we read in it

_First reading, 2026-10-19, after wave 1: ticket #93, the dod station varied, no Lore MCP, **one run per cell**. Treat every point as a hypothesis for the repeats to confirm or kill; the judge alone moved one loop's score by a point when it was asked twice._

- **Every model can write the definition of done for this ticket.** All 15 models and both prompt variants reached a green build, and 16 of the 18 cells wrote acceptance tests that fail on the base commit and pass once the merged pull request's code is applied. The two that did not are Gemini 3 Flash and the production model on the `no-traceability` prompt: their tests pin an interface the merged fix does not have. Gemini 3 Flash's tests expect the hook to receive a per-round breakdown (`{ usage, rounds: [...] }`) that neither the ticket nor the fix asks for; the `no-traceability` run's test expects data at a place the fix never sends it. A loop can go green on such a dod, but it implements the test's design rather than the team's.
- **The dod step is cheap; the rounds after it are the bill.** dod alone cost $0.03 (gpt-6-luna) to $1.53 (Fable 5.1). The loop cost $1.40 to $7.55, almost all of it the Claude Sonnet 4.6 tdd rounds that follow. A definition of done that needs fewer rounds saves more than a cheaper dod model does.
- **The production choice, Gemini 3.1 Pro, is the costliest strong dod and needed the most rounds.** Its dod cost $1.48, the second most, and the loop took 4 tdd rounds, more than any other cell; the judge rated its result 4 / 4 / 3. Opus 5.5 and gpt-6-sol reached green in one round each, at $4.34 and $3.60 per loop.
- **Best quality: Claude Opus 5.5 and gpt-6.1-sol**, the only cells the judge rated 5 for both correctness and completeness. Opus 5.5 did it in one round at $4.34 a loop, with its dod at $0.50 and medium effort. gpt-6.1-sol took two rounds at $4.36, running at low effort.
- **Best value: gpt-6-luna and gpt-5.6-sol.** gpt-6-luna's loop cost $1.40 in 10 minutes and gpt-5.6-sol's $2.64 in 13, both with judge scores of 4 / 4 / 3-4. Both touched the fewest files (7) and overlap the merged pull request least (Jaccard 0.27): they solve the ticket more narrowly than the team did.
- **The newest Claude models match the older ones for less.** Sonnet 5.5 and Haiku 5.5 wrote dods for $0.21 and $0.13, against $1.17 for Sonnet 4.6, with equal judge scores and one round fewer. Fable 5.1 was the most expensive dod ($1.53) and did not score above Opus 5.5.
- **Effort was never equal.** Every run used its CLI's default: high for the Gemini 3 models, Fable 5.1 and Sonnet 4.6; medium for Opus 5.5, Sonnet 5.5, Haiku 5.5 and Gemini 4 Argon; low for three of the Codex models. The low and medium cells did as well as the high ones here, so effort is the next variable to pin down.
- **Prompt:** the `short` variant, which drops the out-of-memory stories written for pods, halved the rounds (4 to 2) and cut the dod cost from $1.48 to $1.05 at the same quality. Dropping the spec-link instructions (`no-traceability`) made the result worse: the dod no longer matched the merged fix, the judge's correctness fell to 3, and the loop took 57 minutes. On a repository whose lint enforces spec links, those instructions earn their tokens.
- **Lore MCP:** too early. One cell has run with Lore so far (Fable 5.1: 1 round, $3.34, 11 minutes, against $4.96 and 20 minutes without).

**What would change a decision, once the repeats agree:** moving `dod` off Gemini 3.1 Pro to Opus 5.5 or gpt-6.1-sol for quality, or to gpt-6-luna for cost, and shipping the `short` dod prompt.

**tdd-round, first reading** (ticket #93, every cell starting from Opus 5.5's dod, no Lore, one run per cell, non-Claude models only so far):

- **The Codex models finish the implementation for a fraction of production's cost.** In production Sonnet 4.6 runs these rounds; after the same Opus dod they cost about $3.84. gpt-6-sol needed 2 rounds and $1.08, gpt-5.6-terra 3 rounds and $1.17, gpt-5.6-luna 5 rounds and $0.21, and gpt-6-luna 8 rounds and $0.12. The judge scored all of them 5 for correctness and completeness.
- **Cheap models buy their price with rounds.** gpt-6-luna needed 8 rounds, against a budget of 12; each round is a CI run in production, so its real cost includes eight CI cycles.
- **Gemini 4 Argon wrote the closest result to the merged PR** (judge 5 / 5 / 5, two rounds) but cost the most of these at $4.44.
- **Two models refused to start without Lore.** gpt-6-astra and gpt-6.1-sol stopped before editing anything, because the prompt makes two Lore tool calls mandatory and, separately, tells the round to follow a `tdd-loop` skill that codex is never given. Both are production defects, not model failures: re-cinq/lore#2834 (prompt) and re-cinq/ai-agent-subsystem#241 (skills staged for claude only, which every codex and gemini pod also lacks).

## What would improve it

_(written by hand from `analyze` and `propose`)_

## How it was run

- Prompts: the bodies of lore's `libs/shared/src/agent-defaults/loop-*.md` at `aa562bb4697daf30e6af4d9f7ac0c4ee8425de27`, with `/workspace` pointed at a local directory per run.
- Each run: a bare `origin` with `main` at the ticket's base commit; the subject's CI commands run locally on the pushed head between rounds.
- Agents: bare `claude`, `gemini` and `codex` CLIs under a scratch HOME with only credentials copied in.

## Limits

- Local CI is one Node version on one machine, not GitHub's matrix.
- Codex has no Bash guard, so its rounds may run acceptance tests the others are refused.
- In the `lore-mcp` arm every station of the loop has the Lore MCP server, the tdd rounds included, so a with-or-without difference is Lore's effect on the whole loop, not on the varied station alone.
- In the `lore-mcp` arm the Lore memory holds episodes from the real runs on these tickets.

