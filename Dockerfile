FROM node:18.18.2

WORKDIR /app

COPY package*.json ./

# 기존의 node_modules 폴더를 제거합니다.
RUN rm -rf node_modules

RUN npm install
RUN npm install openai
# 2023.11.24 추가(ts-node에서는 불필요)
Run npm run build 

COPY . .

EXPOSE 5001
