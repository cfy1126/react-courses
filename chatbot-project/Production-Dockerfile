# 使用官方的 Node.js(最新稳定镜像)作为基础镜像
FROM node:latest

# 设置工作目录(Docker 容器中的工作目录)
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json(将宿主机上的 package.json 和 package-lock.json 文件（如果存在）复制到容器的工作目录（即 /usr/src/app）下)
COPY package*.json ./

# 安装应用依赖
RUN npm install

# 复制应用代码(将宿主机上的当前目录（.）下的所有文件（包括之前的 package*.json 文件）复制到容器的工作目录下)
COPY . .

# 构建应用(对于很多前端应用来说，这可能包括编译 JSX/TSX 代码、压缩资源文件、生成生产环境的静态文件等操作。构建完成后，会在容器中生成一个用于部署的构建产物，通常是一个包含所有静态资源的文件夹。)
RUN npm run build

# 安装 serve 用于提供静态文件(用于提供静态文件服务的轻量级 Node.js 应用)
RUN npm install -g serve

# 暴露应用运行的端口(表示应用将在容器的 5000 端口上运行。虽然这个指令并不会实际在宿主机上开放端口，但它为 Docker 容器运行时提供了一个文档化的端口信息，方便在运行容器时通过端口映射等方式让外部能够访问到容器内的应用。)
EXPOSE 5000

# 启动应用(指令用于指定容器启动时默认执行的命令)通过 -s 参数指定提供 dist 目录下的静态文件，-l 参数指定监听 5000 端口。当容器启动时，就会执行这个命令，启动静态文件服务器，使得应用可以通过 5000 端口对外提供服务。
CMD ["serve", "-s", "dist", "-l", "5000"]

# 命令（终端输入）
# 构建镜像：docker build -t chatbot-project .
# 运行容器：docker run -p 5000:5000 -d chatbot-project