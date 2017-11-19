FROM node:8.9.1
MAINTAINER Angel Manzano Alcaraz <amalcaraz89@gmail.com>

ADD . /code
WORKDIR /code

RUN npm install
RUN npm run build-ts

CMD ["npm", "run", "serve"]