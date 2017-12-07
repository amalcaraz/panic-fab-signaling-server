FROM node:8.9.1
LABEL maintainer "Angel Manzano Alcaraz <amalcaraz89@gmail.com>"

# Update system dependencies
RUN apt-get update && \
    apt-get -y install \
    nano \
    vim \
    sudo \
    apt-transport-https

# Install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt-get update && sudo apt-get -y install yarn

# Install app dependencies
WORKDIR /code
# ADD package*.json ./
# RUN yarn install
# RUN yarn run build-ts
# ADD . .

USER node

EXPOSE 3000
EXPOSE 9229
ENTRYPOINT [ "./environment/entry.sh" ]
CMD ["dev"]