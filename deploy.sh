#!/bin/bash

IMG=memory-game
CONTAINER=memory-game-container

PORT=7000

yarn build
docker build -t ${IMG} .
docker stop ${CONTAINER}
docker run \
    --name ${CONTAINER} \
    --restart=always \
    -p ${PORT}:80 \
    -d \
    ${IMG}
