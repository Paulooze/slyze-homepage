FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY proxy.js /usr/src/app/proxy.js
COPY package.json /usr/src/app/package.json

# Install production dependencies
RUN npm install --production

EXPOSE 3000

CMD [ "node", "proxy.js" ]
