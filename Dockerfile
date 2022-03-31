FROM node:17.0.1-bullseye-slim

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@13
# RUN npm install -g yarn

COPY package.json yarn.lock ./
# RUN npm ci
# RUN npm install
RUN yarn

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]
