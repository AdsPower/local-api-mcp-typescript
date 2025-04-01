# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./

# Use npm install if pnpm is not available
RUN npm install --ignore-scripts

# Copy remaining source files
COPY tsconfig.json ./
COPY src ./src

# Build the project (transpiling TypeScript to JavaScript)
RUN npm run build

# Expose no ports as MCP runs via stdio; if needed, expose port here

# Set entrypoint
ENTRYPOINT ["node", "build/index.js"]
