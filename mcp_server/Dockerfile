# ---------------------------
# MCP Server Dockerfile
# ---------------------------

# Use Playwright official image with browsers and dependencies preinstalled
FROM mcr.microsoft.com/playwright:v1.55.0-jammy

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (Docker caching)
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install --include=dev

# Copy the rest of the project files
COPY . .

# Build TypeScript
RUN npm run build

# Set environment variables (optional defaults, override via docker-compose)
ENV NODE_ENV=production
ENV INFLUX_BUCKET=web_metrics

# Expose the MCP server port
EXPOSE 4000

# Default command: run cron runner
CMD ["npm", "run", "start-runner"]
