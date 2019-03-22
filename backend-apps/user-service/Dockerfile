FROM node:10.12.0

LABEL vendor="Finance Master -> user service"

WORKDIR /

COPY package.json /package.json

RUN npm install

RUN npm i node-ts

# compile
# copy only dist

COPY . .

EXPOSE 3030



CMD [ "npm", "run", "dev" ]