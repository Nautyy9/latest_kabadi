# Kabadi

This repo contains a full-stack app (Vite + React client, Express server) with deployment support for Render and an MCP configuration for Render operations.

## MCP: Render Integration

We’ve added a VS Code settings file that configures a Render MCP server:

- .vscode/settings.json
  - mcp.servers.render.url = https://mcp.render.com/mcp
  - Authorization header = Bearer ${env:RENDER_MCP_TOKEN}

Important: Keep your token out of source control. Set it locally via an environment variable.

### Set RENDER_MCP_TOKEN

Windows (PowerShell):

```
$env:RENDER_MCP_TOKEN = "<your_token_here>"
setx RENDER_MCP_TOKEN "<your_token_here>"
```

macOS/Linux (bash/zsh):

```
export RENDER_MCP_TOKEN="<your_token_here>"
```

Restart VS Code (and any terminals) so your editor picks up the variable.

### Using MCP in VS Code

- Install a client that supports MCP in VS Code (e.g., Claude for VS Code or Cline with MCP support).
- Open the command palette and ensure MCP is enabled.
- The Render server should be available under the configured name "render".
- You can use MCP to:
  - Set or update Render service environment variables
  - Trigger a deploy
  - Fetch logs / status

Note: Exact MCP commands depend on the MCP client UX. Typically, you select the MCP server and choose actions from the tool list.

## Render Deployment

A render.yaml file is included.

- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Health Check Path: `/api/live`
- NODE_ENV=production

Steps:
1. Create a new Web Service on Render from this repository.
2. Render should auto-detect config from render.yaml.
3. In Render dashboard, add your runtime environment variables:
   - DATABASE_URL
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
   - CONTACT_NOTIFY_TO, PICKUP_NOTIFY_TO, CAREER_NOTIFY_TO
   - APP_NAME (optional)
4. Deploy and verify:
   - Visit the service URL
   - Check `/api/live` for liveness
   - Check `/api/ready` for DB readiness

## SMTP Notes

- Brevo (recommended):
  - SMTP_HOST=smtp-relay.brevo.com
  - SMTP_PORT=587 (STARTTLS) or 465 (SSL)
  - SMTP_USER=<verified_sender_email@yourdomain>
  - SMTP_PASS=<Brevo SMTP Key>
  - CONTACT_NOTIFY_TO=<comma-separated recipients>
- The server auto-detects TLS based on port (587 → STARTTLS, 465 → SSL).

## Local Development

- Install deps: `npm install`
- Run dev servers: `npm run dev` (concurrently runs server and client)
- API runs at: http://localhost:3000
- Client runs at: http://localhost:5173

## Testing Email

A dev test route can enqueue sample notifications:

```
curl -X POST http://localhost:3000/api/test-notifications
```

You should receive sample emails at the configured notify addresses if SMTP is set correctly.
