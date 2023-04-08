# Use the official Node.js base image
FROM node:latest

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@9.6.4 && \
    npm install && \
    npm rebuild bcrypt && \
    npx basetag link

# Compile TypeScript
COPY . .
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000



# Start the application
CMD ["npm", "run", "dev"]