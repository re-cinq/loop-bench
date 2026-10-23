#!/usr/bin/env bash
# Rebuilds REPORT.md every two minutes. Detached from any Claude Code session.
cd "$(dirname "$0")/../.."
# Node's compile cache and Jest's cache grow by GBs per run; /tmp is a 16 GB RAM disk.
export TMPDIR=/var/tmp/loop-bench/tmp; mkdir -p "$TMPDIR"
while true; do npx tsx src/cli.ts report >/dev/null 2>>/var/tmp/loop-bench/logs/report-refresh.log; sleep 120; done
