FROM node:18-alpine as base

WORKDIR /src
COPY static /
COPY package*.json /
EXPOSE 3000
RUN npm install -g nodemon typescript
RUN sudo apt-get update
RUN sudo apt-get install -y libgtk2.0-0 libgconf-2-4 libasound2 libxtst6 libxss1 libnss3 xvfb

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . /
CMD ["npm", "start:dev"]
