FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Create api directory
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package.json /usr/src/api
RUN npm install

COPY . /usr/src/api

# GOTO ROOT AND RUN
WORKDIR /usr/src
COPY start.js /user/src

EXPOSE 8080
CMD ["node", "start", "--prod"]
