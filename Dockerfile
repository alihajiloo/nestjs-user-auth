FROM node:14.17.0-alpine As development
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn
COPY . .
RUN yarn build


FROM node:14.17.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn install --prod
COPY . .

COPY --from=development /app/dist ./dist
CMD ["yarn", "start:prod"]