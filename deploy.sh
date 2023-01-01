#!/bin/bash

IMG=memory-game
CONTAINER=memory-game-container

PORT=9100

yarn build
docker build -t ${IMG} .
docker stop ${CONTAINER}
docker rm ${CONTAINER}
docker run \
    --name ${CONTAINER} \
    --restart=always \
    -p ${PORT}:80 \
    -d \
    ${IMG}
