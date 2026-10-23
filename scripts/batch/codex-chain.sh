#!/usr/bin/env bash
# Codex cells for every ticket in order, from a given time. On a usage-limit stop it archives the cells that stop cut short, waits for the reset time the message names, and starts again, until no ticket has a loop left to run. Detached from any Claude Code session.
# Usage: codex-chain.sh HH:MM|now
cd "$(dirname "$0")/../.."
# Node's compile cache and Jest's cache grow by GBs per run; /tmp is a 16 GB RAM disk.
export TMPDIR=/var/tmp/loop-bench/tmp; mkdir -p "$TMPDIR"
A=codex/gpt-5.6-terra,codex/gpt-5.6-sol,codex/gpt-5.6-luna,codex/gpt-6-sol,codex/gpt-6-astra,codex/gpt-6-luna,codex/gpt-6.1-sol

sleep_until() {
  local now target
  now=$(date +%s); target=$(date -d "$1" +%s)
  [ "$target" -lt "$now" ] && target=$((target+86400))
  echo "== waiting until $1"; sleep $((target-now))
}

# The reset time in the first stop's transcript: "try again at 7:30 PM" or "try again at Oct 27th, 2026 8:10 AM".
reset_time_of() {
  local stopped_dir
  stopped_dir=$(echo "$1" | grep -o "see [^ ]*stderr.log" | head -1 | cut -c5- | xargs -r dirname)
  grep -ho "try again at [^\"\\.]*[AP]M" "$stopped_dir"/stdout.jsonl 2>/dev/null | head -1 | sed -E 's/try again at //; s/([0-9])(st|nd|rd|th),/\1,/'
}

sleep_until "$1"
while true; do
  left=0; stopped=""
  for t in 93 94 95 37 144; do
    echo "== ticket $t $(date +%H:%M)"
    out=$(npx tsx src/cli.ts run --ticket $t --station tdd-round,repair-build --replicates 3 --parallel 4 --per-harness 3 --exclude claude --agent "$A" 2>&1)
    echo "$out"
    echo "$out" | grep -q "stopping:" && { stopped="$out"; break; }
  done
  [ -z "$stopped" ] && { echo "== codex chain done $(date +%H:%M)"; break; }
  reset=$(reset_time_of "$stopped")
  scripts/batch/archive-cut-short-cells.sh 'codex-*'
  [ -z "$reset" ] && { echo "== usage limit with no reset time in the transcript, chain stopped $(date +%H:%M)"; break; }
  echo "== usage limit $(date +%H:%M), resuming at $reset + 5 min"
  target=$(date -d "$reset + 5 minutes" +%s); now=$(date +%s)
  [ "$target" -gt "$now" ] && sleep $((target-now)) || sleep 300
done
