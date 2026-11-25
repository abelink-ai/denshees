FROM node:20-alpine

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy workspace config files and patches required by pnpm-lock.yaml
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY patches/ patches/

# Copy only the workspace manifests needed for the frontend build
COPY apps/denshees-frontend/package.json apps/denshees-frontend/
COPY packages/database/package.json packages/database/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/database/ packages/database/
COPY apps/denshees-frontend/ apps/denshees-frontend/

# Generate Prisma client
RUN pnpm --filter @denshees/database db:generate

# Optional build-time public variables inlined into the Next.js client bundle
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID=""
ARG NEXT_PUBLIC_AMPLITUDE_API_KEY=""
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=${NEXT_PUBLIC_GOOGLE_CLIENT_ID}
ENV NEXT_PUBLIC_AMPLITUDE_API_KEY=${NEXT_PUBLIC_AMPLITUDE_API_KEY}
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js app
WORKDIR /app/apps/denshees-frontend
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
