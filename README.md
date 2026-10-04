# Web Performance Monitoring

Synthetic monitoring stack that measures web performance metrics using Playwright and stores them in InfluxDB for visualization in Grafana.

## Architecture

- **MCP Server** - Express API that receives and stores performance metrics
- **Cron Runner** - Scheduled Playwright tests that measure TTI and full load times
- **InfluxDB** - Time-series database for metrics storage
- **Grafana** - Dashboards for visualization

## Monitored Sites

- BBC.co.uk
- Google.co.uk
- Sky.com

Tests run every 15 minutes and measure:
- Time to Interactive (TTI)
- Time to Full Load
- Pass/Fail status

## Quick Start

1. Copy the environment file and set your credentials:
   ```bash
   cp .env.example .env
   ```

2. Start the stack:
   ```bash
   docker-compose up -d
   ```

3. Access the services:
   - Grafana: http://localhost:3000
   - InfluxDB: http://localhost:8086
   - MCP Server: http://localhost:4000

## Configuration

Environment variables (set in `.env`):

| Variable | Description | Default |
|----------|-------------|---------|
| `INFLUX_USERNAME` | InfluxDB admin username | `admin` |
| `INFLUX_PASSWORD` | InfluxDB admin password | - |
| `INFLUX_ORG` | InfluxDB organization | `my-org` |
| `INFLUX_BUCKET` | InfluxDB bucket name | `web_metrics` |
| `INFLUX_TOKEN` | InfluxDB API token | - |
| `GRAFANA_USER` | Grafana admin username | `admin` |
| `GRAFANA_PASSWORD` | Grafana admin password | - |

## API

### POST /record-metrics

Record performance metrics for a site.

```json
{
  "site": "example.com",
  "tti": 1234,
  "fullLoad": 5678,
  "passed": true
}
```

## Development

```bash
cd mcp_server
npm install
npm run dev
```

## License

MIT. See [LICENSE](LICENSE).

For monitors that alert you when a journey fails, and run inside your own network, see [Continuum Community Edition](https://github.com/selectred/continuum-community).
