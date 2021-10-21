FROM node:14.17.5

WORKDIR /usr/src/nodesql

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]