#!/usr/bin/bash
# git clone https//github.com/sbercode/pulse.git
git pull master origin

# build pulse-service
cd pulse-service
bash gradlew build
cd ..

# build ui-service ??

# up services in the docker containers
docker-compose up --build
