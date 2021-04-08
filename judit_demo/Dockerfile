# Use an official node runtime as a parent image
FROM node:lts

WORKDIR /src/

# Install dependencies
ADD package.json /src/

RUN npm install

# Add rest of the client code
ADD . /src/

EXPOSE 3000

CMD npm start