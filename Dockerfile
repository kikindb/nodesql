FROM node:14.17.5

WORKDIR /usr/src/nodesql

COPY package*.json ./

RUN npm install --only=production

COPY ./ ./

USER node

CMD ["/bin/bash"]

EXPOSE 3000