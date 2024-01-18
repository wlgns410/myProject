# 식단 관리 프로젝트 [![NodeJS](https://img.shields.io/badge/node.js-18.2-green.svg)](https://nodejs.org/ko/) [![TypeScript](https://img.shields.io/badge/typescript-5.2.2-blue.svg)](https://www.typescriptlang.org/) [![Express.js](https://img.shields.io/badge/express.js-4.17.18-%2361DAFB.svg)](https://expressjs.com/en/api.html/)

## 프로젝트 소개

Building a Website with Node.js, Express.js and TypeScript

It is a project to process a lot of message notification, using RabbitMQ.

먹은 음식을 입력하면 OpenAI chatgpt를 이용해서 하루에 부족하거나 넘친 칼로리 양을 계산해서 알림해주는 어플리케이션

## 프로젝트 실행 방법


`.env.local` 파일 생성 후  
`.env.example`과 같이 env 환경 설정에 필요한 값을 입력

이후 아래 명령어 입력


```
docker-compose up
```

## ERD 다이어그램

<img width="650" alt="스크린샷 2024-01-18 오후 5 06 41" src="https://github.com/wlgns410/myProject/assets/81137234/c8d2158a-f1c1-4cee-9a9f-334a347ffa3f">


<br>

## Root Directory Structure

```
├── .env.local              # need .env file(local, test, production)
├── package.json            # packages
├── Dockerfile              # express server build
├── docker-compose.yml      # service definition
├── tsconfig.json           # typescript setting
├── .github                 # github action scripts
├── app.ts                  # express project entry point file
└── src                     # express project root directory
```

# Backend Directory Structure

```
└── src
    ├── @types/api          # express interface API DTO
    ├── routes              # express API directory
    ├── config              # express DB, Redis and RabbitMQ config directory
    ├── libs                # express Code Moduleization
    └── database
        └──  entity          # express entity directory
```

# Packages

현재는 node.js v18.18.2 사용중

- [package.json](./package.json, '패키지 파일')

# API Docs(Swagger)

```
http://localhost:5001/api-docs/
```

# Convention

- 파일 네이밍 규칙은 아래 참고

```
## 카멜케이스
파일명, 변수명, 함수명, 디렉토리명은 카멜케이스로 작성한다.

## 파스칼케이스
인터페이스, 클래스는 파스칼케이스로 작성한다.
```
