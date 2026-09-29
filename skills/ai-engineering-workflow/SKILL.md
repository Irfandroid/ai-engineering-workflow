---
name: ai-engineering-workflow
description: Turn vague software ideas and feature requests into controlled, testable implementation work through clarification, specification, tickets, implementation, verification, and documentation.
---

# AI Engineering Workflow Skill

## Purpose

Use this skill to turn vague software ideas or feature requests into controlled, testable implementation work.

The workflow is:

```text
Clarify
→ Specify
→ Plan
→ Implement
→ Verify
→ Document
```

The goal is to prevent premature coding, hidden assumptions, oversized implementation steps, and unverified output.

## Core Rule

Never implement a feature directly from a vague request.

Before writing code:

1. Understand the problem.
2. Identify missing requirements.
3. Clarify important assumptions.
4. Convert the requirements into a written specification.
5. Break the specification into small implementation tickets.
6. Implement one ticket at a time.
7. Test and verify each ticket before continuing.
8. Update project documentation after meaningful changes.

## Mode 1 — Grill

Use this mode when the user's idea, feature request, or project scope is incomplete.

### Objective

Reduce ambiguity before implementation.

### Ask about

- target users
- user problem
- expected outcome
- core user flow
- authentication and permissions
- data sources
- data storage
- integrations
- constraints
- edge cases
- performance expectations
- security requirements
- deployment environment
- out-of-scope items
- success criteria

### Rules

- Ask only questions that materially affect architecture or behavior.
- Do not ask questions that can be safely inferred from the existing repository.
- Inspect the repository before asking about facts that may already exist in code or documentation.
- Separate confirmed facts from assumptions.
- Explicitly record unresolved decisions.
- Do not start implementation while critical requirements remain ambiguous.

### Output

Produce a concise requirement summary containing:

```markdown
## Problem

## Goal

## Users

## Functional Requirements

## Non-Functional Requirements

## Constraints

## Out of Scope

## Open Questions

## Acceptance Criteria
```

## Mode 2 — To Spec

Use this mode after requirements are sufficiently clear.

### Objective

Create a source of truth for implementation.

### Recommended structure

```markdown
# Feature Specification

## 1. Context

## 2. Problem

## 3. Goal

## 4. Users

## 5. User Flow

## 6. Functional Requirements

## 7. Non-Functional Requirements

## 8. Data Model

## 9. API / Interface Behavior

## 10. Error Handling

## 11. Security Considerations

## 12. Constraints

## 13. Out of Scope

## 14. Acceptance Criteria
```

### Rules

- Requirements must be testable where possible.
- Avoid implementation details unless they are actual constraints.
- Mark uncertain decisions explicitly.
- Do not invent product requirements.
- Preserve existing project conventions unless the task requires changing them.

## Mode 3 — To Tickets

Use this mode after a specification exists.

### Objective

Break work into small, independently verifiable units.

### Ticket format

```markdown
## T01 — Ticket Name

### Objective

### Scope

### Dependencies

### Files Likely Involved

### Implementation Notes

### Tests

### Acceptance Criteria
```

### Ticket rules

Each ticket should:

- have one primary objective
- be small enough to review independently
- define its acceptance criteria
- identify dependencies
- include required tests
- avoid combining unrelated work
- minimize unnecessary refactors

Prefer:

```text
T01 — Project setup
T02 — Data model
T03 — Authentication
T04 — API endpoint
T05 — Retrieval logic
T06 — UI integration
T07 — Tests
```

Avoid:

```text
T01 — Build the entire application
```

## Mode 4 — Implement

Use this mode only when a ticket is ready.

### Objective

Implement one ticket completely before moving to the next.

### Implementation loop

```text
Understand ticket
↓
Inspect relevant code
↓
Plan smallest safe change
↓
Write or update tests
↓
Implement
↓
Run checks
↓
Failure?
├── Yes → diagnose → fix → rerun
└── No  → verify acceptance criteria
↓
Document
↓
Complete ticket
```

### Rules

- Work on one ticket at a time.
- Do not silently expand scope.
- Do not rewrite unrelated code unless necessary.
- Prefer minimal changes that fit the existing architecture.
- Reuse existing abstractions before introducing new ones.
- Do not claim success without verification.
- If verification cannot be performed, state exactly what remains unverified.

## Verification

A ticket is not complete merely because the code compiles or the application starts.

Check all relevant layers:

```text
Syntax
→ Type checking
→ Lint
→ Unit tests
→ Integration tests
→ Acceptance criteria
→ Regression risk
```

Use repository-specific commands whenever available. Do not invent passing results.

## Definition of Done

A ticket is complete only when applicable items are satisfied:

- [ ] Ticket objective is implemented
- [ ] Acceptance criteria are satisfied
- [ ] Tests pass
- [ ] Existing behavior is not unintentionally broken
- [ ] Lint passes
- [ ] Type checking passes
- [ ] Build succeeds
- [ ] Error cases are handled
- [ ] Documentation is updated
- [ ] No known critical issue remains hidden

## Failure Handling

If implementation fails:

1. Read the actual error.
2. Identify the root cause.
3. Avoid speculative patches.
4. Make the smallest reasonable fix.
5. Rerun the failed check.
6. Rerun relevant regression checks.
7. Record important architectural discoveries.

Do not use repeated random edits until something appears to work.

## Documentation

Prefer maintaining:

```text
README.md
AGENTS.md
docs/
├── REQUIREMENTS.md
├── SPEC.md
├── ARCHITECTURE.md
├── TASKS.md
└── DECISIONS.md
```

Use these files for requirements, expected behavior, architecture, implementation tickets, and
important technical decisions. Create only the documents that the project actually needs.

## Decision Log

Create a decision entry when a choice materially affects architecture, data model, external
services, security, deployment, performance, compatibility, or developer experience.

Format:

```markdown
## Decision

### Context

### Options Considered

### Chosen Approach

### Reason

### Trade-offs
```

## Anti-Patterns

Avoid:

### Coding before understanding

```text
User idea
→ immediately generate code
```

### Giant implementation prompts

```text
Build frontend + backend + database + auth + AI + deployment
```

### Hidden assumptions

Never silently decide important product behavior.

### Patch loops

```text
Error
→ random patch
→ new error
→ random patch
```

### False completion

Do not say "done" when tests were not run, acceptance criteria were not checked, the build is
failing, or important requirements remain unresolved.

## Repository Awareness

Before proposing changes:

1. Inspect project structure.
2. Read relevant documentation.
3. Check existing conventions.
4. Identify test framework.
5. Identify lint/type/build commands.
6. Inspect nearby implementation patterns.
7. Reuse established abstractions where appropriate.

Do not redesign the project without evidence that redesign is needed.

## Scope Control

If new work appears during implementation:

- classify it as required or optional;
- complete required work only if necessary for the current ticket;
- create a follow-up ticket for unrelated improvements;
- avoid opportunistic refactors.

Use:

```text
Current ticket scope
→ required dependency
→ implementation
```

Not:

```text
Current ticket
→ unrelated cleanup
→ architecture rewrite
→ dependency migration
→ UI redesign
```

## Example Workflow

For an AI/RAG application:

```text
Idea
↓
Clarify users, corpus, query behavior, citations, safety, latency
↓
SPEC.md
↓
ARCHITECTURE.md
↓
TASKS.md
↓
T01 Corpus ingestion
↓
verify
↓
T02 Metadata normalization
↓
verify
↓
T03 Chunking
↓
verify
↓
T04 Embeddings
↓
verify
↓
T05 Retrieval
↓
verify
↓
T06 Reranking (only if evidence requires it)
↓
verify
↓
T07 Context building
↓
verify
↓
T08 Generation
↓
verify
↓
T09 Citation validation
↓
verify
↓
T10 Evaluation
```

## Agent Behavior

The agent should behave like an engineer working from evidence.

Always prefer:

```text
Understand
→ Inspect
→ Decide
→ Implement
→ Test
→ Verify
```

over:

```text
Guess
→ Generate
→ Patch
→ Hope
```

## Final Principle

AI accelerates execution. It does not remove the need for engineering discipline.

```text
Clarify first.
Specify second.
Plan third.
Code fourth.
Verify always.
```
