
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (default Node.js port is often 3000)
EXPOSE 4000

# Start the app
CMD ["npm", "run", "dev"]
