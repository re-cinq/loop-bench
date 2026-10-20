#!/usr/bin/env bash
# Rebuilds REPORT.md every two minutes. Detached from any Claude Code session.
cd "$(dirname "$0")/../.."
while true; do npx tsx src/cli.ts report >/dev/null 2>>/var/tmp/loop-bench/logs/report-refresh.log; sleep 120; done
