FROM node:13.12.0-alpine


# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

RUN mkdir -p /egg/admin

RUN mkdir -p /egg/egglogs

WORKDIR /egg/admin

COPY package.json /egg/admin/package.json

RUN npm i --registry=https://registry.npm.taobao.org

COPY . /egg/admin

EXPOSE 7001 

ENTRYPOINT ["npm","run"]

