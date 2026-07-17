---
name: ask-clarifying-questions
description: Instructs the agent to always interview the user or ask clarifying questions about task inputs before beginning work, to ensure alignment on requirements and aesthetics.
---

# Clarifying Questions & User Alignment Protocol

Whenever a user requests design updates, code adjustments, or new features, the agent must not immediately begin coding or planning. Instead, the agent must stop, analyze the input, and present a structured set of questions to clarify ambiguity, align on aesthetic preferences, and understand specific requirements.

## Protocol Steps:
1. **Analyze**: Review the user's prompt for missing design context, color choices, layout structure details, or interaction preferences.
2. **Formulate Questions**: Draft 3-4 clear, focused questions (ideally with options to choose from) to resolve ambiguities.
3. **Present and Wait**: Present these questions to the user and wait for their response before proceeding to execution.
