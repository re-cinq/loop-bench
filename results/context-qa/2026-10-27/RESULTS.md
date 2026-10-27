# Lore against Utopia against no MCP: 60 questions about lore and Otto (2026-10-27)

**For people deciding where Lore's knowledge should live.** A fresh agent answered hand-checked questions about two repositories three ways: with no MCP server, with Lore's MCP, and with Utopia's MCP on the repository's knowledge base. We measured how right the answers were, what they cost in tokens, and how long they took.

## Why we measured

The context evals only ask questions a model writes from one spec or ADR, and a lore-api model answers from one assembled block. That says little about what an agent gets when it asks a store the questions people really ask: why something was decided, where the code is, which pull request did it, what changed since. This experiment asks those questions of a real agent, a fresh Claude with nothing but the store's MCP server, three times each, so we can also see how much answers vary from run to run.

## Results

60 questions (30 about re-cinq/lore, 30 about re-cinq/Otto), each asked 3 times per arm: 540 answers, none failed to run.

| Arm | Score (replicate range) | Lift over none | Hallucinated | Tokens p50 / p95 | Cost per question | Time p50 / p95 | MCP calls | Score per $ |
|---|---|---|---|---|---|---|---|---|
| none | 0.07 (0.07–0.07) | — | 0% | 2,731 / 2,804 | $0.011 | 2.6 s / 8.1 s | 0 | 6.6 |
| lore | 0.57 (0.53–0.61) | +0.49 | 11% | 49,421 / 187,507 | $0.080 | 16.3 s / 42.8 s | 3.4 | 7.1 |
| utopia | **0.87** (0.87–0.88) | **+0.80** | **7%** | **17,794** / 59,782 | **$0.036** | 24.8 s / 70.9 s | 1.8 | **24.1** |

Score: correct 1, partial 0.5, wrong or "I don't know" 0. On an unanswerable question, saying it does not know, or that no such thing exists, scores 1. Cost is the Claude API price Claude Code reports; the runs were billed to a subscription.

By repository: Utopia scored 0.91 on lore and 0.83 on Otto, against Lore's 0.52 and 0.62.

### By kind of question

| Kind | Questions | none | lore | utopia |
|---|---|---|---|---|
| decision (why, from ADRs) | 10 | 0.00 | **0.93** | 0.90 |
| requirement (what a spec demands) | 10 | 0.00 | 0.52 | **0.87** |
| code-location (which file or function) | 8 | 0.00 | 0.56 | **0.67** |
| history (when a commit changed something) | 8 | 0.00 | 0.44 | **0.88** |
| tracker (which issue or pull request) | 8 | 0.00 | 0.04 | **1.00** |
| learned (gotchas from memory and bug reports) | 6 | 0.08 | 0.78 | **0.89** |
| temporal (what changed since a decision) | 6 | 0.00 | 0.50 | **0.83** |
| unanswerable | 4 | 1.00 | 0.92 | **1.00** |

### Run-to-run variance

| Arm | Same verdict on all 3 asks | Median spread of tokens (CV) | Median spread of time (CV) |
|---|---|---|---|
| none | 98% | 0% | 26% |
| lore | 62% | 25% | 30% |
| utopia | 85% | 0% | 26% |

The judge gave the same verdict twice for 96% of the answers it graded twice.

### Paired

| Comparison | Better / worse / level | Exact McNemar p | Median extra tokens | Median extra time |
|---|---|---|---|---|
| lore vs none | 43 / 1 / 16 | < 0.001 | +56,651 | +13.5 s |
| utopia vs none | 54 / 0 / 6 | < 0.001 | +17,188 | +23.7 s |
| lore vs utopia | 8 / 33 / 19 | < 0.001 | +28,988 | −8.4 s |

## What we read in it

- **Without a store the agent knows nothing about these repositories.** It scores 0.07, almost all of it from declining the unanswerable questions, and it does not make things up.
- **Utopia answers far more than Lore, for less.** 0.87 against 0.57: better on 33 questions, worse on 8, level on 19. It used about a third of Lore's tokens and half its cost, and it is more consistent (85% of questions got the same verdict all three times, against 62%). On quality per dollar it is 3.4× Lore.
- **The gap is what Utopia holds and Lore's tools cannot reach.** Tracker questions: Utopia 1.00, Lore 0.04. History: 0.88 against 0.44. Utopia's base carries the issues, pull requests and commits (the `github` and `git-history` sources), so one `search_chunks` call returns the pull request itself. For example: "Pull request #3705 in re-cinq/lore, 'Implementation loop: fix-ci on Gemini 4 Argon', moved the step… merged on 2026-10-26." Lore's agent found the decision and then said, correctly, that nothing it could search named the pull request.
- **Utopia also wins on specs and amendments.** Requirements 0.87 against 0.52, temporal 0.83 against 0.50. It hands back whole documents with their amendments (the docs source holds every document whole), where Lore's agent sometimes read an older paragraph without the amendment beside it.
- **Lore keeps a small edge on decisions** (0.93 against 0.90, one question's worth, inside the noise).
- **Both stores still repeat stale documents.** Lore's wrong answers (11%) cluster on texts overtaken by an amendment or a later pull request. *lore-temp-03*: ADR-010 still says the context evals run nightly, though #2823 removed the schedule on 2026-10-19. That is **a real documentation drift in lore**. Utopia's wrong answers are fewer (7%).
- **Utopia is slower per answer** (24.8 s median, 70.9 s p95, against Lore's 16.3 s and 42.8 s) despite making half as many calls. Its search took 12–89 s per call on the day; see the next section.

## Utopia's search speed

A Utopia search took 83–89 s on the lore base and 12–24 s on Otto's (37–118 s earlier the same day, under heavier load). The Utopia database has no approximate-nearest-neighbour index (no HNSW or IVFFlat), so every vector search compares against every stored vector. Its 3072-dimension embeddings are above pgvector's 2,000-dimension HNSW limit, so an index needs smaller embeddings or a halfvec or binary-quantised HNSW. Claude Code's default MCP tool timeout is shorter than these searches, so the Utopia arm ran with `MCP_TOOL_TIMEOUT` at 5 minutes; with the default, most lore-base searches failed in a smoke test. Utopia's quality lead holds today only for a client that waits; its time column will drop once search is indexed.

## Utopia rerun after the search fix (same evening)

After Utopia was changed the same day, the Utopia arm was run again on the same 60 questions × 3 asks, this time with **Claude Code's default MCP tool timeout** (no 5-minute override), as a normal agent would run. Results: `../2026-10-27-utopia-rerun/`.

| Run | Score | Hallucinated | Tokens p50 | Cost / question | Time p50 / p95 | Failed tool calls |
|---|---|---|---|---|---|---|
| utopia, first run (5-min timeout) | 0.87 | 7% | 17,794 | $0.036 | 24.8 s / 70.9 s | 5 |
| utopia, rerun (default timeout) | 0.85 | 9% | 17,813 | $0.034 | **14.4 s / 51.3 s** | 11 |

| Repository | Time p50 before → after | Time p95 before → after |
|---|---|---|
| lore | 32.5 s → **15.1 s** | 89.1 s → **40.2 s** |
| Otto | 15.9 s → 12.2 s | 46.2 s → 58.8 s |

- **Twice as fast on the lore base**, a little faster on Otto. A single search on lore's base went from 83–89 s to about 12 s.
- **Quality is the same within noise** (0.85 against 0.87; the rerun's replicate range is 0.82–0.88).
- **The default timeout is now usable.** Only 2 of 11 failed calls were timeouts. The other 9 were the agent calling tools that do not exist (`json`, `answer`, an unprefixed `get_document`), so they are mistakes of the agent, not of Utopia.
- Utopia now answers in about the same time as Lore (14.4 s against 16.3 s median) with a third of the tokens.

## Utopia at the night's search speed

Later that night a single Utopia search took 0.6–6 s on either base. The Utopia arm ran a third time on the same questions with the default MCP timeout. Results: `../2026-10-27-utopia-fast/`.

| Utopia run | Score | Hallucinated | Tokens p50 | Cost / question | Time p50 / p95 | Failed tool calls |
|---|---|---|---|---|---|---|
| first (5-min timeout) | 0.87 | 7% | 17,794 | $0.036 | 24.8 s / 70.9 s | 5 |
| after the evening fix | 0.85 | 9% | 17,813 | $0.034 | 14.4 s / 51.3 s | 11 |
| at the night's speed | 0.84 | 9% | 17,800 | $0.023 | **8.8 s / 30.6 s** | 7 |

At that speed an Utopia answer took about half as long as a Lore answer (16.3 s median), with the same tokens and quality as before. lore's base: 8.7 s median and 0.88 score. Otto's base: 8.9 s median and 0.80 score.

## What this suggests

1. **Make Utopia the context store for agents**, by kind first where the gap is widest: tracker, history, requirements, temporal. That is the plan's switch rule (Utopia ≥ Lore), here on far more than a doc sample, though one run, not two weeks.
2. **Keep Utopia's search fast before switching.** After the evening fix a default agent gets answers in about Lore's time; the slow tail on Otto (59 s p95) still needs a look.
3. **Rank newer statements first in both stores.** Every stale-document error was an older text winning over its amendment.
4. **Fix ADR-010** so it says the context evals run from a developer machine, not nightly.

## How it was run

- **Harness**: loop-bench, branch `context-qa` (`src/qa/`), run from a laptop with `npm run qa -- run --bank experiments/context-qa/banks/lore.yaml,experiments/context-qa/banks/otto.yaml --arms <arm> --reps 3`. none and lore ran 3 asks at a time in the morning; utopia ran 2 at a time in the afternoon, after Utopia was redeployed.
- **Agent**: `claude --print` with `claude-sonnet-5-5` at medium effort. Every ask is a fresh process under a new scratch HOME that holds only the credentials, an empty settings file and no CLAUDE.md, memory, hooks or user skills (the run's start-up line was checked). It runs in an empty git repository whose `origin` names the subject, so it cannot read a file. `--tools ""` removes every built-in tool, and `--strict-mcp-config` gives it only the arm's MCP server.
- **Prompt**, the same for every arm: the repository's name, that the agent cannot read the repository's files and has only its own knowledge and the tools listed to it, to say "I don't know" rather than guess, and to reply as JSON with its sources.
- **The lore arm**: the Lore MCP adapter as installed on the laptop (`~/.re-cinq/lore`, built 2026-10-08) against the production lore-api. Every write tool is blocked. `CONTEXT_PATH` points at the empty run dir, so the adapter reads no local files.
- **The utopia arm**: Utopia's MCP route for the repository's base (`/api/v1/kbs/<kb>/mcp`), reached through `kubectl port-forward` because Utopia sits behind a Google login. It used a read-only personal access token, so Utopia hid its write tool (`remember`). `MCP_TOOL_TIMEOUT` was set to 300000 (see above).
- **Judge**: a second fresh `claude --print` with `claude-opus-5-5` and no tools. It gets the question, the hand-checked gold answer and the answer, and returns correct, partial, wrong or abstained. The first replicate was judged twice, to measure the judge.
- **Questions**: `experiments/context-qa/banks/{lore,otto}.yaml`. 30 per repository: 5 decision, 5 requirement, 4 code-location, 4 history, 4 tracker, 3 learned, 3 temporal, 2 unanswerable. Every gold answer was checked against lore `195034dad`, Otto `3facba0` and GitHub on 2026-10-27. `ANSWERS.md` lists every question with every answer.
- **Raw data**: one folder per question, arm and replicate under this directory, each holding the answer's stream-json, the judge's, and `result.json`. `REPORT.md` is the generated report.

## Limits

- **One run, one answering model.** Sonnet 5.5 at medium effort, on one day. The plan's switch rule asks for two weeks of results.
- **Small cells.** 4 to 10 questions per kind. A kind's score moves by about 0.1 when one question flips.
- **The arms ran hours apart**, so Utopia's base held a few more hours of mirrored issues and commits than Lore's did at its run. No question asks about anything from that day after the bank was checked.
- **Different tool timeouts.** Only the utopia arm ran with a 5-minute MCP timeout. No lore-arm call came near Claude's default.
- **Both stores hold traces of this work.** Lore's memory holds episodes from the sessions that did it, and Utopia mirrors the issues and pull requests themselves. That is what each store really knows, so it counts.
- **The Lore adapter is the 2026-10-08 build installed on the laptop**, not current main. The adapter only forwards to lore-api, which ran current main.
- **Lore's searches strengthened the facts they returned** (retrieval counts), under the agent id `context-qa-bench`.
- **A scoring fix after the none and lore runs.** At first an unanswerable question answered "no such thing exists" was counted as a hallucination. The stored verdicts were re-scored without re-running anything, and that dropped the judge's quoted contradictions from those records.
