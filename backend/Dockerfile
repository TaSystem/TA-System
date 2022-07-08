FROM node:alpine

WORKDIR ./

COPY . ./

COPY package*.json ./

USER root

RUN echo 'Updating apk ...'

RUN apk update && apk add bash
RUN apk add --no-cache bash

ARG DB_HOST \
    DB_USER \
    DB_PASS \
    DB_NAME 

ENV DB_HOST $DB_HOST
ENV DB_USER $DB_USER
ENV DB_PASS $DB_PASS
ENV DB_NAME $DB_NAME


RUN chmod +x /wait-for-it.sh
RUN chmod +x /init.sh

RUN ls -la
# ENTRYPOINT [ "./test.sh" ]


# RUN npm install nodemon
RUN echo 'Updating npm ...'

RUN npm install

EXPOSE 3001


# ENTRYPOINT [ "./waitforit.sh" ]

# ENTRYPOINT ["bash","./waitforit.sh","db:3306", "--timeout=300", "--strict" ,"--", "yarn", "dev" ]
# ENTRYPOINT ["./wait-for-it.sh db:3306 --strict --timeout=300", "--strict" ,"--", "yarn", "dev" ]
# command: ["./waitforit.sh", "db:3306", "--timeout=300", "--strict" ,"--", "echo", "everything is up!"]
# ENTRYPOINT ["./wait-for-it.sh", "db:3306", "--timeout=300", v "--strict" ,"--", "echo", "everything is up!"]

RUN echo 'Starting Backend ...'

# CMD ["yarn", "start"]