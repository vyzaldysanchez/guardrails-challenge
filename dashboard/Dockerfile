FROM node:12.13.0

RUN npm i -g --silent react-scripts@3.2.0

RUN mkdir /dashboard

COPY . /dashboard

WORKDIR /dashboard

ADD .docker/run.sh /run.sh

RUN chmod 755 /run.sh

EXPOSE 3000

CMD [ "/run.sh" ]
