# Which model runs each implementation-loop station best

**For people choosing the model behind one of Lore's agents.** Results of `halengine` as of 2026-10-19 23:50 UTC: 18 loops over 18 cells on re-cinq/HALEngine, prompts from lore `aa562bb4`.

## Why we measured

The implementation loop's stations (`dod`, `tdd-round`, `repair-build`) each run on a model nobody chose by measurement. This bench replays merged tickets from their base commit with each harness and model, with and without the Lore MCP server, and repeats every cell so a lucky run shows as spread rather than as a rank.

## Results

Each row is one cell: one station varied against the production baseline, every other station at baseline. Rows are sorted by model name; cells that have not finished a loop yet show as running or not run yet. Values are the mean over the cell's runs, with min–max and standard deviation in parentheses.

| Ticket | Station varied | Model (CLI) | Effort | Lore | Prompt | Runs | Reached green | Rounds | Cost per loop | Time per loop | Judge correctness | Judge completeness | Judge closeness | dod red→green | Files (Jaccard vs PR) | +/− lines |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| #93 | baseline | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 3.0 | $9.66 | 60.5 min | 4.0 | 5.0 | 3.0 | 0/1 | 14 (0.40) | +268/−51 |
| #93 | dod | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 1 | 1/1 | 2.0 | $7.72 | 23.7 min | 4.0 | 4.0 | 4.0 | 1/1 | 13 (0.54) | +229/−62 |
| #93 | dod | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 1 | 1/1 | 3.0 | $8.48 | 67.3 min | 5.0 | 4.0 | 4.0 | 1/1 | 11 (0.50) | +224/−41 |
| #93 | dod | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 1 | 1/1 | 6.0 | $7.21 | 68.5 min | 4.0 | 4.0 | 3.0 | 1/1 | 15 (0.38) | +256/−61 |
| #93 | dod | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 1 | 1/1 | 2.0 | $5.77 | 24.0 min | 4.0 | 4.0 | 4.0 | 1/1 | 9 (0.45) | +172/−20 |
| #93 | dod | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 1 | 1/1 | 3.0 | $6.37 | 43.0 min | 5.0 | 4.0 | 4.0 | 1/1 | 11 (0.50) | +172/−30 |
| #93 | dod | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 1 | 1/1 | 2.0 | $2.76 | 15.4 min | 5.0 | 5.0 | 4.0 | 1/1 | 8 (0.67) | +153/−20 |
| #93 | dod | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 3.0 | $4.28 | 25.0 min | 4.0 | 4.0 | 3.0 | 1/1 | 12 (0.46) | +195/−47 |
| #93 | dod | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 1.0 | $4.38 | 16.9 min | 3.0 | 3.0 | 3.0 | 1/1 | 8 (0.36) | +136/−7 |
| #93 | dod | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 0.0 | $2.06 | 10.5 min | 4.0 | 4.0 | 4.0 | 1/1 | 7 (0.27) | +159/−7 |
| #93 | dod | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 3.0 | $5.43 | 39.0 min | 5.0 | 5.0 | 4.0 | 1/1 | 9 (0.23) | +173/−8 |
| #93 | dod | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $2.16 | 22.4 min | 4.0 | 3.0 | 3.0 | 1/1 | 7 (0.27) | +106/−3 |
| #93 | dod | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 5.0 | $5.92 | 46.7 min | 4.0 | 5.0 | 4.0 | 1/1 | 9 (0.33) | +197/−11 |
| #93 | dod | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 4.0 | $4.71 | 36.0 min | 4.0 | 5.0 | 4.0 | 1/1 | 11 (0.20) | +178/−8 |
| #93 | dod | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 2.0 | $4.67 | 24.9 min | 4.0 | 4.0 | 3.0 | 1/1 | 7 (0.27) | +194/−7 |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | no-traceability | 1 | 1/1 | 4.0 | $9.37 | 70.2 min | 5.0 | 4.0 | 4.0 | 1/1 | 8 (0.36) | +161/−7 |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | short | 1 | 1/1 | 7.0 | $8.30 | 74.7 min | 4.0 | 5.0 | 4.0 | 1/1 | 14 (0.40) | +208/−46 |
| #93 | dod | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 1 | 1/1 | 1.0 | $5.84 | 15.7 min | 4.0 | 4.0 | 4.0 | 1/1 | 8 (0.36) | +157/−5 |

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
| #93 | dod | `claude-fable-5-1` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-haiku-4-5-20251001` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-haiku-5-5` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-opus-5-5` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-sonnet-4-6` (claude) | without Lore | green ×1 |
| #93 | dod | `claude-sonnet-5-5` (claude) | without Lore | green ×1 |
| #93 | dod | `gpt-5.6-luna` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-5.6-sol` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-5.6-terra` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-6-astra` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-6-luna` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-6-sol` (codex) | without Lore | green ×1 |
| #93 | dod | `gpt-6.1-sol` (codex) | without Lore | green ×1 |
| #93 | dod | `gemini-3-flash-preview` (gemini) | without Lore | green ×1 |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×1 |
| #93 | dod | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×1 |
| #93 | dod | `gemini-4-argon` (gemini) | without Lore | green ×1 |

## What we read in it

_No conclusions yet: too few loops have finished._

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

