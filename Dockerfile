# 依赖版本 一般选择alpine，体积小，功能可能有精简，但够用
FROM node:13.12.0-alpine


# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

# 容器内创建目录
RUN mkdir -p /egg/admin

RUN mkdir -p /egg/egglogs

# 定义工作的文件夹
WORKDIR /egg/admin

# 把当前根目录的 package.json 复制到 容器内的 /egg/admin/package.json
COPY package.json /egg/admin/package.json

# 容器内依赖安装
RUN npm i --registry=https://registry.npm.taobao.org

# 排除.dockerignore 里定义的文件，其余的复制到 /egg/admin目录内
COPY . /egg/admin

# 容器暴露端口为7001
EXPOSE 7001 

# 默认运行npm run，与启动指令传入的参数组合成指令：npm run XXXX
ENTRYPOINT ["npm","run"]

