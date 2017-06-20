# Format: FROM    repository[:version]
FROM       ubuntu:latest

# Installation:
# Import MongoDB public GPG key AND create a MongoDB list file
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
RUN apt-get update && apt-get install --reinstall -y --no-install-recommends software-properties-common
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install --reinstall -y --no-install-recommends apt-utils
RUN echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.4.list
# Update apt-get sources AND install MongoDB
#RUN apt-get update && apt-get install -y mongodb-org
RUN apt-get update && apt-get install -y --allow-change-held-packages mongodb-org=3.4.0 mongodb-org-server=3.4.0 mongodb-org-shell=3.4.0 mongodb-org-> mongos=3.4.0 mongodb-org-tools=3.4.0

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Expose port 27017 from the container to the host
EXPOSE 27017

# Set usr/bin/mongod as the dockerized entry-point application
ENTRYPOINT ["/usr/bin/mongod"]


# Format: docker build --tag/-t <user-name>/<repository> .
# Example:
#$ docker build --tag mongo-image/repo .

# Basic way
# Usage: docker run --name <name for container> -d <user-name>/<repository>
#$ docker run -p 27017:27017 --name mongo_instance_001 -d mongo-image/repo

# Dockerized MongoDB, lean and mean!
# Usage: docker run --name <name for container> -d <user-name>/<repository> --noprealloc --smallfiles
#$ docker run -p 27017:27017 --name mongo_instance_001 -d my/repo --smallfiles

# Checking out the logs of a MongoDB container
# Usage: docker logs <name for container>
#$ docker logs mongo_instance_001

# Playing with MongoDB
# Usage: mongo --port <port you get from `docker ps`>
#$ mongo --port 27017

# If using docker-machine
# Usage: mongo --port <port you get from `docker ps`>  --host <ip address from `docker-machine ip VM_NAME`>
#$ mongo --port 27017 --host 192.168.59.103

# Start two containers and map the ports
#$ docker run -p 28001:27017 --name mongo_instance_001 -d my/repo

#$ docker run -p 28002:27017 --name mongo_instance_002 -d my/repo

# Now you can connect to each MongoDB instance on the two ports
#$ mongo --port 28001

#$ mongo --port 28002