# Which model runs each implementation-loop station best

**For people choosing the model behind one of Lore's agents.** Results of `halengine` as of 2026-10-20 01:13 UTC: 71 loops over 47 cells on re-cinq/HALEngine, prompts from lore `aa562bb4`.

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
| #93 | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 0/1 | 1.0 | $0.02 | 1.1 min | 5.0 | 4.0 | 4.0 | — | 7 (0.27) | +143/−5 |
| #93 | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 0.0 | $0.40 | 1.4 min | 4.0 | 4.0 | 4.0 | — | 7 (0.27) | +140/−5 |
| #93 | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 1 | 0/1 | 1.0 | $0.13 | 0.8 min | 5.0 | 4.0 | 4.0 | — | 7 (0.27) | +143/−5 |
| #93 | repair-build | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 0.0 | $0.49 | 1.8 min | 5.0 | 4.0 | 4.0 | — | 7 (0.27) | +147/−5 |
| #93 | repair-build | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 0/1 | 1.0 | $0.00 | 1.5 min | 4.0 | 4.0 | 3.0 | — | 7 (0.27) | +143/−5 |
| #93 | repair-build | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 0.0 | $0.15 | 1.4 min | 4.0 | 4.0 | 3.0 | — | 7 (0.27) | +143/−5 |
| #93 | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | repair-build | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 0.0 | $0.06 | 1.5 min | 5.0 | 4.0 | 3.0 | — | 7 (0.27) | +144/−5 |
| #93 | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $1.22 ($0.28–$2.77, sd $1.11) | 3.6 min (3.0 min–4.7 min, sd 0.8 min) | 5.0 (5.0–5.0, sd 0.0) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 14 (9–16, sd 3) (0.39 (0.35–0.45, sd 0.05)) | +192/−39 |
| #93 | repair-build | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.20 ($0.07–$0.36, sd $0.12) | 2.9 min (1.6 min–4.6 min, sd 1.3 min) | 5.0 (5.0–5.0, sd 0.0) | 4.3 (4.0–5.0, sd 0.5) | 4.3 (4.0–5.0, sd 0.5) | — | 9 (7–14, sd 3) (0.29 (0.27–0.31, sd 0.02)) | +148/−10 |
| #93 | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.58 ($0.49–$0.65, sd $0.07) | 3.3 min (2.9 min–3.6 min, sd 0.3 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +147/−5 |
| #93 | repair-build | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 2/3 | 0.3 (0.0–1.0, sd 0.5) | $0.72 ($0.46–$1.04, sd $0.24) | 3.3 min (2.5 min–3.9 min, sd 0.6 min) | 4.3 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +146/−5 |
| #93 | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.61 ($0.49–$0.80, sd $0.14) | 2.5 min (2.1 min–2.8 min, sd 0.3 min) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–8, sd 0) (0.30 (0.27–0.36, sd 0.04)) | +144/−5 |
| #93 | repair-build | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 0.0 (0.0–0.0, sd 0.0) | $0.51 ($0.47–$0.55, sd $0.03) | 2.5 min (2.2 min–2.7 min, sd 0.2 min) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 7 (7–7, sd 0) (0.27 (0.27–0.27, sd 0.00)) | +142/−5 |
| #93 | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-fable-5-1` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-haiku-4-5-20251001` (claude) | none (no thinking) (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-haiku-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-opus-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-sonnet-4-6` (claude) | high (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `claude-sonnet-5-5` (claude) | medium (claude CLI default) | without Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 1.0 | $0.08 | 3.3 min | 5.0 | 5.0 | 4.0 | — | 10 (0.21) | +168/−7 |
| #93 | tdd-round | `gpt-5.6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $0.11 | 4.7 min | 4.0 | 5.0 | 4.0 | — | 11 (0.50) | +210/−37 |
| #93 | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | with Lore | baseline | 1 | 1/1 | 1.0 | $1.52 | 4.1 min | 5.0 | 5.0 | 4.0 | — | 7 (0.27) | +202/−6 |
| #93 | tdd-round | `gpt-5.6-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 1/1 | 1.0 | $1.45 | 4.1 min | 4.0 | 5.0 | 4.0 | — | 9 (0.60) | +184/−16 |
| #93 | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `gpt-5.6-terra` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 2.0 | $1.03 | 4.2 min | 5.0 | 5.0 | 4.0 | — | 10 (0.55) | +208/−42 |
| #93 | tdd-round | `gpt-6-astra` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `gpt-6-astra` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $0.79 | 0.7 min | 1.0 | 2.0 | 2.0 | — | 3 (0.11) | +121/−2 |
| #93 | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `gpt-6-luna` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 1.0 | $0.03 | 3.7 min | 5.0 | 5.0 | 4.0 | — | 9 (0.23) | +207/−6 |
| #93 | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | with Lore | baseline | 1 | 1/1 | 1.0 | $0.83 | 4.4 min | 5.0 | 5.0 | 4.0 | — | 8 (0.36) | +199/−8 |
| #93 | tdd-round | `gpt-6-sol` (codex) | medium (codex default) | without Lore | baseline | 1 | 1/1 | 1.0 | $0.71 | 4.4 min | 5.0 | 5.0 | 4.0 | — | 7 (0.27) | +190/−6 |
| #93 | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | with Lore | baseline | 0 | not run yet | — | — | — | — | — | — | — | — | — |
| #93 | tdd-round | `gpt-6.1-sol` (codex) | low (codex default) | without Lore | baseline | 1 | 0/1 | 0.0 | $0.09 | 0.6 min | 1.0 | 2.0 | 2.0 | — | 3 (0.11) | +121/−2 |
| #93 | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $0.80 ($0.63–$1.12, sd $0.23) | 6.8 min (6.0 min–8.2 min, sd 1.0 min) | 5.0 (5.0–5.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | 4.0 (4.0–4.0, sd 0.0) | — | 8 (7–10, sd 1) (0.32 (0.27–0.42, sd 0.07)) | +191/−9 |
| #93 | tdd-round | `gemini-3-flash-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 2.7 (2.0–4.0, sd 0.9) | $1.26 ($0.52–$2.72, sd $1.04) | 10.8 min (7.7 min–17.0 min, sd 4.3 min) | 4.7 (4.0–5.0, sd 0.5) | 5.0 (5.0–5.0, sd 0.0) | 3.7 (3.0–4.0, sd 0.5) | — | 9 (7–13, sd 3) (0.32 (0.25–0.43, sd 0.08)) | +206/−21 |
| #93 | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $2.60 ($1.79–$3.62, sd $0.76) | 13.2 min (10.1 min–17.2 min, sd 2.9 min) | 4.3 (3.0–5.0, sd 0.9) | 4.7 (4.0–5.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | — | 25 (6–63, sd 27) (0.23 (0.11–0.30, sd 0.08)) | +403/−205 |
| #93 | tdd-round | `gemini-3.1-pro-preview` (gemini) | high (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 1.0 (1.0–1.0, sd 0.0) | $1.68 ($1.38–$2.26, sd $0.41) | 9.4 min (7.6 min–11.3 min, sd 1.5 min) | 3.7 (3.0–4.0, sd 0.5) | 4.7 (4.0–5.0, sd 0.5) | 3.7 (3.0–4.0, sd 0.5) | — | 8 (5–9, sd 2) (0.51 (0.33–0.60, sd 0.13)) | +180/−13 |
| #93 | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | with Lore | baseline | 3 | 3/3 | 0.3 (0.0–1.0, sd 0.5) | $2.22 ($1.59–$3.04, sd $0.61) | 10.8 min (4.9 min–17.7 min, sd 5.3 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.7 (4.0–5.0, sd 0.5) | — | 9 (9–10, sd 0) (0.75 (0.70–0.78, sd 0.04)) | +185/−16 |
| #93 | tdd-round | `gemini-4-argon` (gemini) | medium (gemini-cli default) | without Lore | baseline | 3 | 3/3 | 0.3 (0.0–1.0, sd 0.5) | $2.94 ($1.78–$4.09, sd $0.94) | 10.7 min (5.1 min–18.6 min, sd 5.8 min) | 5.0 (5.0–5.0, sd 0.0) | 5.0 (5.0–5.0, sd 0.0) | 4.0 (4.0–4.0, sd 0.0) | — | 12 (12–12, sd 0) (0.36 (0.36–0.36, sd 0.00)) | +170/−12 |

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
| #93 | repair-build | `gpt-5.6-luna` (codex) | without Lore | excluded_harness ×1 |
| #93 | repair-build | `gpt-5.6-sol` (codex) | without Lore | green ×1 |
| #93 | repair-build | `gpt-5.6-terra` (codex) | without Lore | excluded_harness ×1 |
| #93 | repair-build | `gpt-6-astra` (codex) | without Lore | green ×1 |
| #93 | repair-build | `gpt-6-luna` (codex) | without Lore | excluded_harness ×1 |
| #93 | repair-build | `gpt-6-sol` (codex) | without Lore | green ×1 |
| #93 | repair-build | `gpt-6.1-sol` (codex) | without Lore | green ×1 |
| #93 | repair-build | `gemini-3-flash-preview` (gemini) | with Lore | green ×3 |
| #93 | repair-build | `gemini-3-flash-preview` (gemini) | without Lore | green ×3 |
| #93 | repair-build | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×3 |
| #93 | repair-build | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×2, excluded_harness ×1 |
| #93 | repair-build | `gemini-4-argon` (gemini) | with Lore | green ×3 |
| #93 | repair-build | `gemini-4-argon` (gemini) | without Lore | green ×3 |
| #93 | tdd-round | `gpt-5.6-luna` (codex) | with Lore | green ×1 |
| #93 | tdd-round | `gpt-5.6-luna` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-5.6-sol` (codex) | with Lore | green ×1 |
| #93 | tdd-round | `gpt-5.6-sol` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-5.6-terra` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-6-astra` (codex) | without Lore | retry_budget ×1 |
| #93 | tdd-round | `gpt-6-luna` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-6-sol` (codex) | with Lore | green ×1 |
| #93 | tdd-round | `gpt-6-sol` (codex) | without Lore | green ×1 |
| #93 | tdd-round | `gpt-6.1-sol` (codex) | without Lore | retry_budget ×1 |
| #93 | tdd-round | `gemini-3-flash-preview` (gemini) | with Lore | green ×3 |
| #93 | tdd-round | `gemini-3-flash-preview` (gemini) | without Lore | green ×3 |
| #93 | tdd-round | `gemini-3.1-pro-preview` (gemini) | with Lore | green ×3 |
| #93 | tdd-round | `gemini-3.1-pro-preview` (gemini) | without Lore | green ×3 |
| #93 | tdd-round | `gemini-4-argon` (gemini) | with Lore | green ×3 |
| #93 | tdd-round | `gemini-4-argon` (gemini) | without Lore | green ×3 |

## What we read in it

_First clean reading, 2026-10-20 01:30: ticket #93, the dod station varied, no Lore, **one run per cell**. The first attempt at this wave (archived in `results/archive/`) ran Claude with the author's personal instructions loaded; its numbers are not comparable and are not used here._

- **One run per cell says little about rounds and cost.** The same cells, rerun clean, moved a lot: the `short` prompt went from 2 tdd rounds to 7, gpt-6-sol from 1 to 5, Haiku 5.5 from 2 to 6. A loop's rounds depend as much on what a given Sonnet round happens to break as on the dod. Rankings by rounds or loop cost wait for the repeats.
- **Every dod passes the deterministic check except the production baseline's.** 17 of 18 cells wrote acceptance tests that fail on the base commit and pass once the merged pull request's code is applied. The production model, Gemini 3.1 Pro on the shipped prompt, did not: its tests read the usage total from a place the merged fix never fills, so with the team's code applied they receive nothing. The loop still went green, by building the dod's design instead of the team's. That is one run, so it is a lead to check in the repeats, not a verdict.
- **The dod step itself is cheap for almost every model.** Alone it cost $0.01 (gpt-6-luna) to about $1.70 (Fable 5.1); Gemini 3.1 Pro, the production choice, cost about $0.65. What a loop costs is mostly the tdd rounds after it.
- **Fastest and cheapest loops:** gpt-5.6-terra ($2.06, 10 minutes, green after one round), gpt-6-luna ($2.16) and Sonnet 5.5 ($2.76, 15 minutes, judge 5 / 5 / 4). The production loop was the most expensive at $9.66 and an hour.
- **Judge scores sit in a narrow band.** Nearly every cell scored 4 or 5 for correctness and completeness; only gpt-5.6-sol fell to 3 / 3 / 3. On this small ticket the judge separates models less than cost and rounds do.
- **Prompt variants:** neither `short` nor `no-traceability` beat the shipped prompt in this run ($8.30 and $9.37 against $9.66, with 7 and 4 rounds). The earlier reading that `short` halves the rounds did not survive the clean rerun.
- **Effort was not equal** (column Effort): each CLI ran its default, high for the Gemini 3 models, Fable 5.1 and Sonnet 4.6, medium or low for the rest.

**Running overnight without Claude:** the tdd-round and repair-build comparisons for the ten Gemini and Codex models, with and without Lore, three runs each (120 loops), from clean starting branches: gpt-5.6-terra's dod and the first red build of the Gemini 4 Argon loop. Claude cells, the with-Lore dod wave and the dod repeats resume when Claude is back.

**Production defects found along the way:** re-cinq/lore#2834 (the tdd-round prompt makes Lore tools mandatory; two Codex models refused to work without them) and re-cinq/ai-agent-subsystem#241 (skills reach Claude pods only).

**tdd-round and repair-build, Gemini models** (ticket #93, three runs per cell, with and without Lore; tdd-round starts from gpt-5.6-terra's clean dod, repair-build from the first red build of the clean Gemini 4 Argon loop):

- **All three Gemini models finish the implementation every time.** 18 of 18 tdd-round loops reached a green build, in 0 to 4 extra rounds.
- **Gemini 4 Argon writes the best code; Gemini 3 Flash is the cheap option.** Argon: judge 5 / 5 / 4-5 in every run, $2.22 to $2.94 a loop. Flash: 4.7-5 / 5 / 4, $0.80 to $1.26. Gemini 3.1 Pro: 3.7-4.3 / 4.7 / 3.7 at $1.68 to $2.60, below both. For scale, production's Sonnet 4.6 took the same terra dod to green for about $1.70 in the clean wave 1 (one run).
- **Repairs are cheap and mostly succeed.** A Gemini repair costs $0.20 to $1.22 and takes 2.5 to 3.6 minutes; 17 of 18 repairs left the build green. The one that did not was Gemini 3.1 Pro, the production repair model, without Lore.
- **Lore makes no consistent difference here.** With Lore, Flash's tdd rounds got cheaper ($0.80 against $1.26) and Argon's too ($2.22 against $2.94), but Gemini 3.1 Pro's got dearer ($2.60 against $1.68), and Flash's repairs cost six times more with Lore ($1.22 against $0.20). With three runs per cell and spreads of $0.40 to $1.10, none of these differences is clear of the noise.

**Codex models: pending.** The ChatGPT account hit its usage limit at about 02:30, so 67 Codex loops failed in seconds; they were discarded and rerun from 04:05, when the limit reset.

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

