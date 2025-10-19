FROM node:20.9.0


ARG NODE_ENV
ENV NODE_ENV=production
# env end

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean

COPY . .

RUN yarn lint:js:fix && yarn lint:css:fix; exit 0

COPY . .

RUN yarn build

CMD [ "yarn", "start" ]