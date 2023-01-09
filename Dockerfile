FROM node:18.12.1

COPY ./package.json .
COPY ./yarn.lock .
COPY tsconfig.json .

RUN yarn install --frozen-lockfile --non-interactive

COPY . .

ENV PORT 80

RUN yarn build

RUN yarn install --production --frozen-lockfile --non-interactive --prefer-offline

EXPOSE 80

CMD [ "yarn", "start" ]