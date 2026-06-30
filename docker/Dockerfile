# Multi-stage Dockerfile for Wayora
FROM oven/bun:1.1.20 as base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml .pnpm-store ./ 

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]