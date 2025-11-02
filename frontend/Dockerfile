FROM node:20-alpine
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY ./src /app/src
COPY index.html /app/
COPY vite.config.js /app/
CMD ["npm", "run", "start"]
