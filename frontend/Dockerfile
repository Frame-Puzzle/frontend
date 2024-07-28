FROM node:20.15-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 프로덕션 환경을 위한 이미지를 빌드합니다.
FROM node:20.15-alpine
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY package.json package-lock.json ./
RUN npm install --only=production

# 애플리케이션이 사용하는 포트를 노출합니다.
EXPOSE 3000

# 컨테이너가 시작될 때 실행할 명령어를 설정합니다.
CMD ["npm", "run"]
