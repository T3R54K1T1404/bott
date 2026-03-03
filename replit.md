# Nao-MD WhatsApp Bot

A feature-rich WhatsApp bot built with Node.js using the Baileys library (multi-device).

## Architecture

- **index.js** - Entry point, spawns `main.js` as a cluster worker with auto-restart
- **main.js** - Core bot logic, WhatsApp connection via Baileys, starts Express server
- **server.js** - Express web server (port 5000), shows status page and provides API endpoints
- **handler.js** - Message handler, processes incoming WhatsApp messages and runs plugins
- **config.js** - Bot configuration (owner, API keys, globals) — not committed to git
- **lib/** - Utility libraries (simple.js, converter.js, levelling.js, etc.)
- **plugins/** - Hot-loaded bot command plugins
- **json/** - Game/quiz data files

## Setup Notes

- **Baileys**: Uses `@adiwajshing/baileys` aliased to `@whiskeysockets/baileys` (the `@yupra/baileys` package is unavailable on npm)
- **lib/simple.js**: Fixed to use named exports from Baileys (newer versions changed from `.default` exports)
- **server.js**: Listens on `0.0.0.0:5000` for Replit webview compatibility
- **main.js**: Server starts before WhatsApp auth flow so port 5000 is available immediately
- **config.js**: Created from template — set owner phone number and API keys before using

## Running

- Workflow: `node index.js` — starts the bot manager which forks `main.js`
- On first run, bot prompts for WhatsApp phone number (pairing code authentication)
- Web status page available on port 5000

## Configuration (config.js)

Set the following in `config.js`:
- `global.owner` — Array of `[phoneNumber, name, isDeveloper]`
- `global.nomorown` — Owner's phone number
- `global.namebot` — Bot name
- `global.APIs` / `global.APIKeys` — External API endpoints and keys

## Dependencies

- `@adiwajshing/baileys` (aliased to `@whiskeysockets/baileys`) - WhatsApp Web API
- `express` - Web server
- `lowdb` - JSON database
- `pino` - Logger
- Various media/utility packages

## Deployment

- Target: VM (always-running, needed for persistent WhatsApp connection)
- Run command: `node index.js`
