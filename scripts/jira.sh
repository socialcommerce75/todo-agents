#!/usr/bin/env bash
# Usage: jira.sh get <KEY>             prints the ticket summary, then its description
#        jira.sh comment <KEY> <text>  adds a comment to the ticket
# Needs env: JIRA_SITE, JIRA_EMAIL, JIRA_TOKEN
set -euo pipefail
auth="$JIRA_EMAIL:$JIRA_TOKEN"
case "$1" in
  get)
    curl -sS -u "$auth" "$JIRA_SITE/rest/api/2/issue/$2?fields=summary,description" \
      | jq -r '.fields.summary + "\n\n" + (.fields.description // "")'
    ;;
  comment)
    jq -n --arg b "$3" '{body: $b}' \
      | curl -sS -u "$auth" -X POST -H 'content-type: application/json' \
          "$JIRA_SITE/rest/api/2/issue/$2/comment" -d @- > /dev/null
    ;;
esac