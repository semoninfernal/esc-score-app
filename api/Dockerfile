FROM node:boron

# Create api directory
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package.json /usr/src/api
RUN npm install

# Bundle api app
COPY . /usr/src/api

EXPOSE 88
CMD ["npm", "start"]
