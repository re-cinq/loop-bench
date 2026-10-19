# Which model runs each implementation-loop station best

**For people choosing the model behind one of Lore's agents.** Results of `halengine` as of 2026-10-19 12:20 UTC: 10 loops over 10 cells on re-cinq/HALEngine, prompts from lore `aa562bb4`.

## Why we measured

The implementation loop's stations (`dod`, `tdd-round`, `repair-build`) each run on a model nobody chose by measurement. This bench replays merged tickets from their base commit with each harness and model, with and without the Lore MCP server, and repeats every cell so a lucky run shows as spread rather than as a rank.

## Results

Each row is one cell: one station varied against the production baseline, every other station at baseline. Values are the mean over the cell's runs, with min–max and standard deviation in parentheses.

| Ticket | Station varied | Agent | Context | Prompt | Runs | Reached green | Rounds | Cost per loop | Time per loop | Judge correctness | Judge completeness | Judge closeness | dod red→green | Files (Jaccard vs PR) | +/− lines |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| #93 | baseline | `gemini/gemini-3.1-pro-preview` | none | baseline | 1 | 1/1 | 4.0 | $6.04 | 30.8 min | 4.0 | 4.0 | 4.0 | 1/1 | 11 (0.50) | +195/−47 |
| #93 | dod | `claude/claude-opus-5-5` | none | baseline | 1 | 1/1 | 1.0 | $4.34 | 19.5 min | 5.0 | 5.0 | 4.0 | 1/1 | 13 (0.54) | +190/−48 |
| #93 | dod | `codex/gpt-5.6-terra` | none | baseline | 1 | 1/1 | 2.0 | $4.35 | 23.4 min | 5.0 | 4.0 | 4.0 | 1/1 | 9 (0.45) | +201/−12 |
| #93 | dod | `claude/claude-sonnet-4-6` | none | baseline | 1 | 1/1 | 3.0 | $5.19 | 27.4 min | 5.0 | 4.0 | 4.0 | 1/1 | 11 (0.50) | +164/−43 |
| #93 | dod | `gemini/gemini-4-argon` | none | baseline | 1 | 1/1 | 3.0 | $6.44 | 29.7 min | 5.0 | 4.0 | 4.0 | 1/1 | 12 (0.58) | +235/−44 |
| #93 | dod | `gemini/gemini-3-flash-preview` | none | baseline | 1 | 1/1 | 3.0 | $6.49 | 38.3 min | 4.0 | 5.0 | 3.0 | 0/1 | 13 (0.43) | +222/−44 |
| #93 | dod | `claude/claude-haiku-4-5-20251001` | none | baseline | 1 | 1/1 | 3.0 | $7.55 | 37.1 min | 5.0 | 4.0 | 3.0 | 1/1 | 11 (0.50) | +277/−35 |
| #93 | dod | `codex/gpt-5.6-sol` | none | baseline | 1 | 1/1 | 2.0 | $2.64 | 12.5 min | — | — | — | 0/1 | 7 (0.27) | +153/−7 |
| #93 | dod | `codex/gpt-6-sol` | none | baseline | 1 | 1/1 | 1.0 | $3.60 | 15.6 min | — | — | — | 0/1 | 8 (0.36) | +154/−14 |
| #93 | dod | `codex/gpt-5.6-luna` | none | baseline | 1 | 1/1 | 2.0 | $3.99 | 22.7 min | — | — | — | 0/1 | 11 (0.50) | +199/−44 |

What the columns mean:

- **Reached green**: the loop ended with the subject's CI checks passing on the pushed branch.
- **Rounds**: tdd rounds the loop spent (12 is the budget).
- **Cost**: every model's token counts at its standard market price per million tokens, read 2026-10-19 (`src/core/pricing.ts`). No launch or promotional discounts: Gemini 4 Argon is priced at its December rate and gpt-5.6-sol at its pre-promotion rate, so the numbers hold for a long-term decision. Claude and Codex runs used subscriptions; their dollar figures are what the same tokens cost on the API.
- **Judge**: a fixed model's 1–5 scores against the issue and the merged pull request.
- **dod red→green**: the agent's acceptance tests failed on the base commit and passed once the merged pull request's production code was applied.
- **Files (Jaccard vs PR)**: files the branch touched, and the overlap of that set with the merged pull request's.

### How the loops ended

| Ticket | Station varied | Agent | Context | How the loops ended |
|---|---|---|---|---|
| #93 | baseline | `gemini/gemini-3.1-pro-preview` | none | green ×1 |
| #93 | dod | `claude/claude-opus-5-5` | none | green ×1 |
| #93 | dod | `codex/gpt-5.6-terra` | none | green ×1 |
| #93 | dod | `claude/claude-sonnet-4-6` | none | green ×1 |
| #93 | dod | `gemini/gemini-4-argon` | none | green ×1 |
| #93 | dod | `gemini/gemini-3-flash-preview` | none | green ×1 |
| #93 | dod | `claude/claude-haiku-4-5-20251001` | none | green ×1 |
| #93 | dod | `codex/gpt-5.6-sol` | none | green ×1 |
| #93 | dod | `codex/gpt-6-sol` | none | green ×1 |
| #93 | dod | `codex/gpt-5.6-luna` | none | green ×1 |

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
- In the `lore-mcp` arm the Lore memory holds episodes from the real runs on these tickets.

