# 使用官方 Node.js 镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制项目文件
COPY . .

# 公开端口
EXPOSE 5173

# 启动应用
CMD ["npm", "run", "dev"]
