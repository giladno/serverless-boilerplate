FROM node:10-alpine

RUN mkdir -p /usr/src/app
RUN chown node:node /usr/src/app

ENV NODE_ENV=production

WORKDIR /usr/src/app
USER node

COPY package*.json ./
RUN npm install --quiet --no-progress && npm install --quiet --no-progress aws-sdk && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

COPY . .

CMD ["node", "index.js"]
