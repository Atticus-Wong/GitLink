# GitLink 🐙💬

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-v14-green.svg)](https://discord.js.org/)

## Overview

**GitLink** is a Discord bot that brings GitHub repository activity directly into your Discord server. Receive real-time updates on commits, pull requests, and issues—perfect for dev teams collaborating via Discord!

- **Slash Commands**: Interact with GitHub repos effortlessly (e.g., `/pr`, `/commits`, `/create-issue`).
- **SQLite Persistence**: Stores config and state locally.
- **TypeScript**: Fully typed for reliability.

## Features

- **/ping**: Bot responsiveness check.
- **/commits [repo]**: List recent commits from a GitHub repo.
- **/pr [repo]**: View open pull requests.
- **/create-issue [repo] [title] [body]**: Create a new GitHub issue via Discord.
- Customizable via `.env` (repo tokens, Discord guild IDs).

## Quick Start

1. **Clone & Install**:
   ```bash
   git clone https://github.com/Atticus-Wong/GitLink.git
   cd GitLink
   pnpm install  # Or npm/yarn
   ```

2. **Setup `.env`** (copy `.env.example` if available):
   ```
   DISCORD_TOKEN=your_bot_token
   GITHUB_TOKEN=your_github_pat  # Optional for private repos/private actions
   DEFAULT_REPO=owner/repo      # Default GitHub repo
   ```

3. **Deploy Slash Commands**:
   ```bash
   pnpm deploy-commands  # Registers /ping, /pr, etc.
   ```

4. **Run**:
   ```bash
   pnpm dev  # Development (tsx watch)
   # OR
   pnpm build && pnpm start  # Production
   ```

Invite bot to server: [Discord Developer Portal](https://discord.com/developers/applications).

## Project Structure

```
src/
├── commands/     # Slash command handlers (createIssue.ts, pr.ts, commits.ts, ping.ts)
├── utils/        # Helpers (trycatch.ts, const.ts)
├── types/        # TypeScript definitions
├── config.ts     # App config
├── deploy-commands.ts
└── index.ts      # Bot entrypoint
```

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: [Discord.js v14](https://discord.js.org/)
- **DB**: [SQLite3](https://www.sqlite.org/) (better-sqlite3)
- **Build**: tsup + tsx
- **Package Mgr**: pnpm

## Contributing

Fork → Branch → PR! Use issues for bugs/features.

## License

MIT © Atticus Wong