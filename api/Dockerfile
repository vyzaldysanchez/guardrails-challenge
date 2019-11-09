FROM node:12.13.0

RUN npm i -g --silent sequelize-cli eslint pm2

RUN mkdir /api

COPY . /api

WORKDIR /api

ADD .docker/run.sh /run.sh

RUN chmod 755 /run.sh

EXPOSE 3000

CMD [ "/run.sh" ]
