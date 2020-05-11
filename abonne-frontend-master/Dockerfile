FROM node:alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5001
CMD ["npm", "run", "serve"]