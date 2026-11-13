# Review passes
Run every pass below on the PR diff. Output verdict.txt (PASS or FAIL) and review.md.

## correctness
Does the change do what the ticket asked and nothing more? Are tests added, and not weakened? Is it simple?
Snapshot files changed? Every snapshot change must match what the ticket asked for. An unexplained snapshot update is a finding.

## security
Injection, unsafe HTML (dangerouslySetInnerHTML), secrets in code, risky new dependencies, new network calls.

## accessibility-privacy
Labels and keyboard use on new controls, color contrast, personal data stored or sent anywhere new.

## Severity rules
- critical or high: FAIL
- medium: PASS, with a comment
- low: comment only
- Every finding needs file, line and proof (a concrete input or reasoning). Findings without proof are dropped.