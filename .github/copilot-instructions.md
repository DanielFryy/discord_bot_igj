## Copilot Instructions for AI Agents: discord_bot_igj

This project is a TypeScript Discord bot for logging and monitoring server activity, with a focus on voice channel events and user engagement. The codebase is modular, testable, and uses modern TypeScript, Rollup, and Vitest.

### Architecture Overview
- **Entry Point:** `src/bot.ts` initializes the Discord client, loads listeners, and starts the bot.
- **Listeners:** All Discord event logic is in `src/listeners/`, split by event type (e.g., `ready`, `voiceStateUpdate`, `presenceUpdate`, `interactionCreate`). Each listener is a function that registers event handlers on the client.
- **Commands:** Slash command definitions are in `src/commands/` and registered via `src/commands/register.ts`.
- **Utilities:** Channel and logging helpers are in `src/utils/`. Logging is centralized via `log.utils.ts` and posts to a Discord channel/thread.
- **Config:** Constants (e.g., date format, timezone) are in `src/config/constants.ts`.
- **Messages:** Discord webhook notification templates for CI are in `src/messages/special/`.

### Developer Workflows
- **Build:** `bun run build` (uses Rollup, outputs to `dist/`)
- **Test:** `bun run test:all` (Vitest, with Discord mocks in `src/__mocks__/`)
- **Lint/Format:** `bun run lint`, `bun run check-format`, `bun run check-types`
- **Register Commands:** `bun run register-commands` (builds and runs command registration script)
- **Start Bot:** `bun run build && bun run start` (runs built bot from `dist/bot.cjs`)
- **Pre-commit/Pre-push:** Husky hooks enforce type checks, lint, format, tests, and build before pushing (see `.husky/` scripts)

### Project Conventions & Patterns
- **Event-Driven:** All Discord logic is event-based; listeners are registered in `src/bot.ts`.
- **Environment Variables:** All sensitive config (tokens, channel IDs) is loaded from `.env` (see `.env.template`).
- **Error Handling:** Utility functions throw on missing/invalid config (e.g., missing channel ID).
- **Testing:** All logic is tested with Vitest; Discord.js is mocked in `src/__mocks__/discord.mock.ts`.
- **Logging:** Use `log()` and `logToThread()` from `src/utils/log/log.utils.ts` for all bot logs.
- **Slash Commands:** Define commands as `RESTPostAPIApplicationCommandsJSONBody` objects in `src/commands/`.
- **CI Integration:** GitHub Actions workflow (`.github/workflows/discord-notifier.yaml`) runs tests/build and notifies Discord via webhook using message templates.

### Integration Points
- **Discord.js:** Main API for bot logic and events.
- **OpenAI:** Used in `askMeCommandHandler` for AI-powered responses (requires `OPENROUTER_API_KEY`).
- **GitHub Actions:** Notifies Discord on build/test results using webhook and message templates.

### Key Files/Directories
- `src/bot.ts` — Bot entry point and event registration
- `src/listeners/` — Event listeners (one file per event)
- `src/commands/` — Slash command definitions and registration
- `src/utils/` — Channel and logging utilities
- `src/__mocks__/` — Discord.js mocks for testing
- `.env.template` — Required environment variables
- `.husky/` — Git hooks for enforcing checks
- `.github/workflows/discord-notifier.yaml` — CI/CD workflow and Discord notifications

### Example Patterns
- **Registering a new event:** Add a new file in `src/listeners/`, export a function that takes a `Client`, and register it in `src/bot.ts`.
- **Adding a command:** Define a new command object in `src/commands/`, add to the array in `register.ts`, and re-run `bun run register-commands`.
- **Logging:** Always use the provided log utilities; do not log directly to console except for startup/debug.

---
For more, see `README.md` and referenced files. When in doubt, follow the structure and patterns of existing listeners, commands, and utilities.
