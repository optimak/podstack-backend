FROM node:16

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Set up the working directory
WORKDIR /usr/src/app

# Copy package.json and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy Python script and install dependencies
COPY . .
RUN pip3 install -r requirements.txt

# Expose necessary port (for Express app)
EXPOSE 8080

# Run the Express app
CMD ["npm", "start"]
