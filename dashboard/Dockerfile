FROM node:12.13.0

RUN yarn global add --silent react-scripts@3.2.0 serve tailwindcss

RUN mkdir /dashboard

COPY . /dashboard

WORKDIR /dashboard

ADD .docker/run.sh /run.sh

RUN chmod 755 /run.sh

EXPOSE 3000

CMD [ "/run.sh" ]
