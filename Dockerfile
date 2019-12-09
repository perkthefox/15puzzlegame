FROM node:10.13-alpine

ENV APP_SRC=/opt/perkthefox/15puzzle

RUN mkdir -p ${APP_SRC}
WORKDIR ${APP_SRC}

RUN apk update && apk upgrade
RUN apk add git

COPY . ${APP_SRC}
RUN npm install

RUN npm run build

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

CMD ["npm", "start"]
