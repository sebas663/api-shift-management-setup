# Dockerfile

#Install PM2
RUN npm install pm2 -g

# The FROM directive sets the Base Image for subsequent instructions
FROM node:7

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

# Set start command
#CMD ["node", "server.js"]
#change CMD for use PM2
#CMD ["pm2-docker", "process.yml"]

#To split each processes in his own Docker, you can use the –only [app-name] option:
CMD ["pm2-docker", "process.yml", "--only", "api-shift-management-setup"]


# Creathe the image.
# docker build -t api-shift-management-setup .

# Run the image
# docker run -p 4200:4200 api-shift-management-setup

#Sharing Docker image
# see https://buddy.works/guides/how-dockerize-node-application

#Continuous deployment for Node.js on DigitalOcean
#see https://hackernoon.com/continuous-deployment-for-node-js-on-digitalocean-d800e8520ffe

#http://b.zsh.io/2013/12/que-es-dokku.html
#http://blog.shippable.com/continuous-deployment-to-digital-ocean-for-nodejs-app
#https://blog.codeship.com/continuous-integration-and-delivery-with-docker/
#http://rancher.com/
#https://kubernetes.io/
#https://docs.docker.com/machine/examples/ocean/
#http://mherman.org/blog/2015/03/06/node-with-docker-continuous-integration-and-delivery/#.WTYO9GjTfIU
#http://www.bitbosh.com/2016/05/continuous-integration-setup-nodejs.html
#http://jipiboily.com/2014/from-zero-to-fully-working-ci-server-in-less-than-10-minutes-with-drone-docker/


#https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-centos-7
#https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-centos-7

#https://www.metachris.com/2017/01/how-to-install-nodejs-7-on-ubuntu-and-centos/