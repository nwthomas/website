# AGENTS.md

## Safety

- Do not commit secrets or credentials
- Do not run destructive commands without explicit approval from me

## Continuous Improvements

- Look for opportunities to improve the agent UX while working
- Make small, directly-related improvements to the AGENTS.md when they are low-risk and clearly beneficial
- Suggest broader additions with concrete rationale and a proposed next step instead of silently expanding scope

## Repository Conventions

- Match existing repository patterns before introducing new ones
- Prefer durable repository guidance over snapshots of current implementation details in AGENTS.md
- Keep changes scoped to the requested task
- Prefer existing utilities and dependencies; only deviate after checking in with me
- Add or update tests when changing behavior
- Validate changes with tests, linting, static analysis tools, formatters, and other repository guardrails before finishing

## Commit Messages

Use conventional commits for prefixes.

After the conventional commits prefix, the first letter should be capitalized and all content lower-cased thereafter unless referring to titles, names, acronyms, filenames, product names, or other identifiers that need their original cashing.

Format:

```
type: summary
```

Example:

```
fix: Correct the Redis implementation for music caching
```
