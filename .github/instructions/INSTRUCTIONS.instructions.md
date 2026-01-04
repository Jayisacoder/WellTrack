---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.3. INSTRUCTIONS FOR THE CODING PERSON (NEXT.JS DEVELOPER)

You are responsible for implementing the functional application exactly as specified. This is not an exploratory build. It is a requirements-driven MVP with role-based access and AI integration.

Critical Rule: Do Not Rename Pages or Change Purpose

Each page exists to satisfy a specific rubric requirement. You must keep:

Page names

Page intent

Role restrictions

Mandatory Technical Constraints

Next.js 16 (App Router)

JavaScript (not TypeScript)

Prisma + PostgreSQL

Tailwind CSS

bcryptjs for passwords

Role-Based Authentication enforced via middleware

Page Implementation Rules

You must implement all seven pages:

Home: Static explanation + navigation

About: CCC.1.1 problem explanation

Why WellTrack?: CCC.1.2 solution planning

Features: CCC.1.3 explanation + AI justification

Product: Interactive MVP (input + output)

Rubric Evidence: LP Staff only

Reflection: LP Staff only

Pages 6 and 7 must be:

Hidden from unauthorized users

Blocked at the route level

Accessible only by the three provided LP emails

AI Integration (Non-Optional)

AI must:

Analyze user data OR reflections

Produce insights or recommendations

Be clearly described in the UI and README

A placeholder AI call is not acceptable. The AI must generate output based on user input.

README Is Part of the Code Deliverable

You must include:

Project overview

Problem summary

Feature list (with AI)

Tech stack

How to run

Reflection section

Final Reminder

This project is graded on alignment, not ambition. A simple, working, clearly explained app that matches the instructions will score higher than a complex app that deviates.

Do not add features unless explicitly required.
Do not rename pages.
Do not bypass role restrictions.