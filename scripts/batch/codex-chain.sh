#!/usr/bin/env bash
# Codex cells for every ticket in order, starting at a given time, stopping at the first usage-limit stop. Detached from any Claude Code session.
# Usage: codex-chain.sh HH:MM
cd "$(dirname "$0")/../.."
A=codex/gpt-5.6-terra,codex/gpt-5.6-sol,codex/gpt-5.6-luna,codex/gpt-6-sol,codex/gpt-6-astra,codex/gpt-6-luna,codex/gpt-6.1-sol
now=$(date +%s); target=$(date -d "$1" +%s); [ "$target" -lt "$now" ] && target=$((target+86400))
echo "== waiting until $1"; sleep $((target-now))
for t in 93 94 95 37 144; do
  echo "== ticket $t $(date +%H:%M)"
  out=$(npx tsx src/cli.ts run --ticket $t --station tdd-round,repair-build --replicates 3 --parallel 4 --per-harness 3 --exclude claude --agent "$A" 2>&1)
  echo "$out"
  echo "$out" | grep -q "stopping:" && { echo "== usage limit, chain stopped $(date +%H:%M)"; break; }
done
