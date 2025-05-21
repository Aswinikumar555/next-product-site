FROM node:18

WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files only (not node_modules)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
# (The .dockerignore file will ensure node_modules is excluded)
COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]