From node:14.18-alpine3.12 as build-stage

RUN apk update && apk add build-base autoconf nasm lcms2-dev automake make bash

RUN addgroup -g 10000 app && \
    adduser -D -u 10000 -G app app -s /bin/sh

RUN npm install --global expo-cli

USER app

ARG environment

ENV APP_ROOT=/home/app/app ENVIRONMENT=$environment NODE_OPTIONS=--max_old_space_size=4096

RUN mkdir -p $APP_ROOT && mkdir -p $APP_ROOT/log

WORKDIR $APP_ROOT

#  package.lock

COPY --chown=app:app . ./

RUN ls -al && yarn install && yarn cache clean

RUN GENERATE_SOURCEMAP=false expo build:web

RUN cp ./apple-app-site-association_${ENVIRONMENT} ./web-build/apple-app-site-association

FROM nginx:alpine

ENV APP_ROOT=/home/app/app NODE_ENV=development

RUN mkdir -p $APP_ROOT

WORKDIR $APP_ROOT

RUN mkdir log

COPY ./deployments/mysite.template /tmp/containers.nginx

RUN envsubst '$APP_ROOT' < /tmp/containers.nginx > /etc/nginx/conf.d/default.conf

COPY --from=build-stage /home/app/app/web-build/ /home/app/app/public/

CMD [ "nginx", "-g", "daemon off;" ]
