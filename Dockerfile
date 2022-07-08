FROM node:16-alpine3.12

WORKDIR ./

COPY . ./

COPY package*.json ./

ARG NEXT_BACKEND_URL

ENV NEXT_BACKEND_URL $NEXT_BACKEND_URL
RUN echo 'Updating npm ...'

RUN npm install

EXPOSE 3000
RUN echo yarn dev ...'

CMD ["yarn", "dev"]