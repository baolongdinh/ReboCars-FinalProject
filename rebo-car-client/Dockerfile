# Use a Node.js base image
FROM node:14-alpine

# Install Yarn
RUN apk add --no-cache yarn

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --ignore-engines

# Copy the rest of the application code
COPY . .

# Build the Vue.js app
RUN yarn build

# Install serve globally
RUN yarn global add serve

# Expose the app's port
EXPOSE 80

# Start the app
CMD ["serve", "-s", "dist", "-l", "80"]