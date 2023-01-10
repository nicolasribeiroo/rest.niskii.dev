FROM node:18.12.1

COPY . .

RUN yarn install --frozen-lockfile --non-interactive

RUN yarn build

COPY . .

ENV PORT 80

EXPOSE 80

CMD [ "yarn", "dev" ]