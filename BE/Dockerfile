FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./ /usr/src/app

#RUN npm install -g npx
#RUN yarn add -g typescript
#RUN npm install -g yarn

EXPOSE 5000

# You can change this
CMD [ "yarn", "dev" ]