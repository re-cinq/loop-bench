# Lore's MCP against no MCP: 60 questions about lore and Otto (2026-10-27)

**For people deciding where Lore's knowledge should live.** This is the first half of the context-qa experiment: a fresh agent answers hand-checked questions about two repositories with no MCP server, then with Lore's. The Utopia arm runs once Utopia's search is fixed (see "Utopia arm: on hold").

## Why we measured

The context evals only ask questions a model writes from one spec or ADR, and a lore-api model answers from one assembled block. That says little about what an agent gets when it asks Lore the questions people really ask: why something was decided, where the code is, which pull request did it, what changed since. This experiment asks those questions of a real agent, a fresh Claude, and measures quality, tokens and time together. Each question is asked three times, so we can see how much answers vary from run to run.

## Results

60 questions (30 about re-cinq/lore, 30 about re-cinq/Otto), each asked 3 times per arm: 360 answers, none failed to run.

| Arm | Score (replicate range) | Lift over none | Hallucinated | Tokens p50 / p95 | Cost per question | Time p50 / p95 | MCP calls |
|---|---|---|---|---|---|---|---|
| none | 0.07 (0.07–0.07) | — | 0% | 2,731 / 2,804 | $0.011 | 2.6 s / 8.1 s | 0 |
| lore | **0.57** (0.53–0.61) | **+0.49** | 11% | 49,421 / 187,507 | $0.080 | 16.3 s / 42.8 s | 3.4 |

Score: correct 1, partial 0.5, wrong or "I don't know" 0. On an unanswerable question, saying it does not know, or that no such thing exists, scores 1. Cost is the Claude API price Claude Code reports; the runs were billed to a subscription.

### By kind of question

| Kind | Questions | none | lore | Lift |
|---|---|---|---|---|
| decision (why, from ADRs) | 10 | 0.00 | **0.93** | +0.93 |
| learned (gotchas from memory and bug reports) | 6 | 0.08 | 0.78 | +0.69 |
| code-location (which file or function) | 8 | 0.00 | 0.56 | +0.56 |
| requirement (what a spec demands) | 10 | 0.00 | 0.52 | +0.52 |
| temporal (what changed since a decision) | 6 | 0.00 | 0.50 | +0.50 |
| history (when a commit changed something) | 8 | 0.00 | 0.44 | +0.44 |
| tracker (which issue or pull request) | 8 | 0.00 | **0.04** | +0.04 |
| unanswerable | 4 | 1.00 | 0.92 | −0.08 |

### Run-to-run variance

| Arm | Same verdict on all 3 asks | Median spread of tokens (CV) | Median spread of time (CV) |
|---|---|---|---|
| none | 98% | 0% | 26% |
| lore | 62% | 25% | 30% |

The judge gave the same verdict twice for 94% of the answers it graded twice.

### Paired

Lore against no MCP: Lore better on 43 questions, worse on 2, level on 15 (exact McNemar p < 0.001). Per question, Lore's median cost was 56,651 more tokens and 13.5 s more time.

## What we read in it

- **Without Lore, the agent knows nothing about these repositories.** It scores 0.07, almost all of it from declining the unanswerable questions. It does not make things up (0% hallucinated): it says it does not know.
- **Lore lifts the agent from almost nothing to about half right.** It costs about 18× the tokens and 6× the time per question, but quality per dollar is still slightly better than with no MCP (7.1 against 6.6 points per dollar).
- **Lore is strong on why.** Decisions are answered 93% of the time and learned gotchas 78%. That is what the ADR ingest and the memory are built for.
- **Lore cannot answer "which pull request".** Tracker questions score 0.04. The agent finds the decision or the memory about a change and then says, correctly, that nothing it can search names the pull request. Example: "I could not find the pull request number. The decision is ADR-001 … Nothing I could search says which PR added it." Lore ingests no issues or pull requests that its MCP tools can search.
- **History is half there.** Dates and commits come back only when a memory or a spec amendment happens to mention them. Lore has no commit history the agent can search.
- **Lore hands the agent stale truths, and those are its hallucinations.** 11% of Lore answers were wrong, against 0% with no MCP, and they cluster where a document was overtaken:
  - *lore-temp-03, "Do the context evals run nightly in CI?"* Lore answered "Yes, according to ADR-010 (amended 2026-10-02)". ADR-010 was never amended after #2823 removed the schedule on 2026-10-19. **This is a real documentation drift in lore**, which the agent repeated faithfully.
  - *lore-temp-01, cross-family review.* The answer read ADR-039's original rule and missed its 2026-10-14 amendment.
  - *lore-req-02, upkeep order.* The answer gave "the 3 oldest first" from FR12.19 and missed FR12.19a (2026-10-25), which changed the order.
- **Answers vary a lot between asks.** Only 62% of questions got the same verdict all three times with Lore. The arm's score moved between 0.53 and 0.61 by replicate alone, so a difference of less than about 0.08 between two arms is noise. Most of the spread is the agent choosing different tools (sometimes `lore_search_memory`, sometimes not) and stopping at different points.
- **Context makes the agent slightly worse at saying "I don't know"** (1.00 → 0.92 on unanswerable questions). Once it has context, it sometimes builds an answer from something near the question.

## What this suggests

1. **Feed issues, pull requests and commits to the agent.** Tracker and history are Lore's two weakest kinds, and they are exactly what the Utopia mirror carries (the `github` and `git-history` sources). If the Utopia arm answers them, that is the strongest argument for the switch.
2. **Prefer the newest statement.** Every Lore hallucination here was an older text beating its amendment. Ranking amendments and newer documents above older ones, or showing both with dates, addresses the 11%.
3. **Fix ADR-010** so it says the context evals run from a developer machine, not nightly.

## Utopia arm: on hold

Utopia was smoke-tested on two questions before the full run. Its `search_chunks` tool took 118 s on the lore base and 37 s on Otto, longer than Claude Code's MCP tool timeout, so 5 of 9 calls on one question failed. The database (`utopia-db`, at its 4-CPU limit) has no approximate-nearest-neighbour index (no HNSW or IVFFlat), so every vector search scans everything. The 3072-dimension embeddings are above pgvector's 2,000-dimension HNSW limit. Running the arm before that is fixed would measure the timeout, not the answers. The Utopia arm runs on the same bank, with the same agent, prompt, judge and 3 replicates, once search is fast. Its result goes in the table above as a third row.

## How it was run

- **Harness**: loop-bench, branch `context-qa` (`src/qa/`), run from a laptop with `npm run qa -- run --bank experiments/context-qa/banks/lore.yaml,experiments/context-qa/banks/otto.yaml --arms none,lore --reps 3 --parallel 3`.
- **Agent**: `claude --print` with `claude-sonnet-5-5` at medium effort. Every ask is a fresh process under a new scratch HOME that holds only the credentials, an empty settings file and no CLAUDE.md, memory, hooks or user skills (the run's start-up line was checked). It runs in an empty git repository whose `origin` names the subject, so it cannot read a file. `--tools ""` removes every built-in tool, and `--strict-mcp-config` gives it only the arm's MCP server.
- **Prompt**, the same for every arm: the repository's name, that the agent cannot read the repository's files and has only its own knowledge and the tools listed to it, to say "I don't know" rather than guess, and to reply as JSON with its sources.
- **The lore arm**: the Lore MCP adapter as installed on the laptop (`~/.re-cinq/lore`, built 2026-10-08) against the production lore-api. Every write tool is blocked. `CONTEXT_PATH` points at the empty run dir, so the adapter reads no local files.
- **Judge**: a second fresh `claude --print` with `claude-opus-5-5` and no tools. It gets the question, the hand-checked gold answer and the answer, and returns correct, partial, wrong or abstained. The first replicate was judged twice, to measure the judge.
- **Questions**: `experiments/context-qa/banks/{lore,otto}.yaml`. 30 per repository: 5 decision, 5 requirement, 4 code-location, 4 history, 4 tracker, 3 learned, 3 temporal, 2 unanswerable. Every gold answer was checked against lore `195034dad`, Otto `3facba0` and GitHub on 2026-10-27.
- **Raw data**: one folder per question, arm and replicate under this directory, each holding the answer's stream-json, the judge's, and `result.json`. `REPORT.md` is the generated report.

## Limits

- **One answering model.** Sonnet 5.5 at medium effort. A stronger or more persistent agent might dig further with the same tools.
- **Small cells.** 4 to 10 questions per kind. A kind's score moves by about 0.1 when one question flips.
- **Lore's memory holds episodes about these very topics**, written by the sessions that did the work. That is what Lore really knows, so it counts, but it helps the learned and temporal kinds.
- **The Lore adapter is the 2026-10-08 build installed on the laptop**, not current main. The adapter only forwards to lore-api, which ran current main.
- **Lore's searches strengthened the facts they returned** (retrieval counts), under the agent id `context-qa-bench`.
- **A scoring fix after the run.** At first an unanswerable question answered "no such thing exists" was counted as a hallucination. The stored verdicts were re-scored without re-running anything, and that dropped the judge's quoted contradictions from the stored records.
