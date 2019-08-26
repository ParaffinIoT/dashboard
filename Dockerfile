FROM node:8.11.3

ENV ROOTPATH=/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR $ROOTPATH

COPY package.json package-lock.json ./

RUN npm install

RUN npm run build

COPY . .

CMD ["npm", "start"]


