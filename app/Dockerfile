FROM node:boron

# Create api directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

# Bundle api app
COPY . /usr/src/app
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start-prod"]
