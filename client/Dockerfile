# Use an official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Install 'serve' to serve the production build
RUN npm install -g serve

# Expose production port (for 'serve')
EXPOSE 8081

# Start the app using 'serve'
CMD ["serve", "-s", "dist"]
