# Dockerfile

# The FROM directive sets the Base Image for subsequent instructions
FROM node:7


#Install PM2
RUN npm install pm2 -g

# Create a new folder for our application
RUN mkdir -p /usr/src/app

# Set the working dir when our container executes
WORKDIR /usr/src/app

# Copy our package.json file
ADD package.json /usr/src/app

# Install our packages
RUN npm install

# Copy the rest of our application
COPY . /usr/src/app

#Expose our application port
EXPOSE 4200

#To split each processes in his own Docker, you can use the –only [app-name] option:
CMD ["pm2-docker", "process.yml", "--only", "api-shift-management-setup"]


