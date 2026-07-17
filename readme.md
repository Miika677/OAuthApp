# Word of the Day CRUD App with GitHub OAuth Login

## Overview

This is a full-stack CRUD application that uses GitHub OAuth for authentication. Users can sign in with their GitHub account and add or vote for their word of choice. Word with the most votes is displayed at the top of the page.

The goal of this project is to simulate a real-world authentication flow and practice building a structured full-stack application with proper development workflows, including testing, CI, and deployment.

Visit the website at https://o-auth-app-theta.vercel.app/

## Current Status

- Basic word voting system functionality: implemented
- Placeholder login using HTTP-only cookies: implemented
- GitHub OAuth integration: Implemented
- Testing: Basic backend tests for word endpoints implemented with pytest (in progress)
- CI pipeline: Implemented (GitHub Actions)
- Deployment: Deployed! https://o-auth-app-theta.vercel.app/

- Currently working on: Website functionality & refactoring

### Possible Future Additions

- Different OAuth services with linked local account; support for multiple login providers
- Postgresql Docker container as testing DB to replace in-memory SQLite
- Render Cron Jobs to periodically remove words that haven't been voted for in a while, potentially supplemented by AI-assisted detection of gibberish or low-quality submissions (if a suitable free API is available)

## Tech Stack
- React, FastAPI, PostgreSQL
- Render (DB & Backend deployment)
- Vercel (Frontend deployment)

## Key Features
App Features:
- GitHub OAuth authentication
- Add new words or vote for existing ones
- Live ranking of most-voted word
- Full-stack CRUD architecture
- Guestbook

Development:
- CI/CD Pipeline
- Backend tests
