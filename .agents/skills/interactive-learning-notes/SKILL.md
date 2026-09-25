---
name: interactive-learning-notes
description: Run conversation-led technical learning sessions that evolve a repository note or MDX lesson one question and one focused example at a time. Use when the user wants to learn through an incrementally edited note rather than receive a completed tutorial.
---

# Interactive learning notes

Build the learner's understanding and the note together. Treat the learner's
current question as the curriculum.

## Learning loop

1. Read the target note, its nearest repository instructions, and the local
   conventions for interactive examples.
2. Answer the current question directly. Establish the smallest causal model
   that makes the behavior predictable before introducing more API surface.
3. Pressure-test the explanation against a practical use case. Prefer an
   established pattern or concrete problem; say when no strong use case exists.
4. Update the note with only this increment. Add at most one focused example by
   default, and replace an earlier weak example when the new explanation makes
   it obsolete.
5. Verify the changed section with the lightest method allowed by the user's
   constraints, then stop and let the learner choose the next question.

The turn is complete when the question is answered, the note preserves that
understanding without pre-empting later lessons, and any new example visibly
demonstrates the claimed behavior.

## Teaching choices

- Make comparisons interactive when changing a value or mode exposes the
  concept. Use a static diagram when the important idea is a relationship or
  timeline rather than an interaction.
- Prefer the repository's existing live-editor and content components. Follow
  their documented usage instead of rebuilding equivalent infrastructure.
- Keep prose source readable. Move substantial JSX illustrations or helpers
  into a colocated supplementary directory named `_<note-slug>/`, then import a
  small component into the note.
- Preserve useful learner skepticism. Explain why a design exists, distinguish
  capability from practical motivation, and remove contrived examples.
- Keep examples slow or exaggerated only when that makes an otherwise brief
  effect observable; state when teaching values differ from production values.

## Editing boundaries

- Preserve the user's chosen file, framework, and scope.
- Carry explicit workflow constraints through the session, including requests
  to use an existing dev server or skip particular commands.
- Inspect the rendered note through an already-running local page when
  available. A successful render is evidence for presentation, not permission
  to broaden validation beyond the user's constraints.
- Keep each turn internally coherent: revise nearby prose when a new insight
  contradicts or sharpens an earlier explanation.
