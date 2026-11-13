#!/usr/bin/env bash
# Run by Claude Code before every Edit, Write or MultiEdit. Exit code 2 blocks the edit.
f=$(jq -r '.tool_input.file_path // empty')
block() { echo 'Blocked: protected file. Do not edit pipeline, policy or existing test files.' >&2; exit 2; }
case "$f" in
  # Pipeline and policy files.
  *.github/*|*.claude/*|*/agents.yaml|*/risk-tiers.yaml|*/REVIEW.md|*/CLAUDE.md) block ;;
  # Existing tests are protected; new test files are allowed.
  *.test.ts|*.test.tsx) [ -e "$f" ] && block ;;
esac
exit 0