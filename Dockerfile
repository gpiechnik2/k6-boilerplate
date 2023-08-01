FROM node:latest

USER root

# install k6
WORKDIR /
ADD https://github.com/grafana/k6/releases/download/v0.45.0/k6-v0.45.0-linux-amd64.tar.gz /k6-v0.45.0-linux-amd64.tar.gz
RUN tar -xzf /k6-v0.45.0-linux-amd64.tar.gz
RUN mv /k6-v0.45.0-linux-amd64/k6 /usr/bin/k6

# install npm dependencies
COPY package*.json ./
RUN npm install

ENTRYPOINT [ "npm" ]
