# codePlatform

## 个人开发辅助平台

辅助平常开发工作的工具平台

## 主要支线

- **master 分支**（ 最终确定版本）

- **develop 分支** 开发初步确定版本（ 线上正式环境版本 ）

- **test 分支** 开发者版本（ 线上预发布环境版本，用于测试 ）

多环境发布过程统一由 Jenkins 发布

## 项目开发与搭建过程中产生的文章

[雨雀](https://www.yuque.com/u120129/dyqi27)

## 技术栈

### 后端

- Egg.js
- mysql
- TypeScript

[地址](https://gitee.com/colgateyhj/codePlatformApi-node)

### 前端

[地址](https://gitee.com/colgateyhj/codePlatform)

## 功能

### 登陆功能

- [x] 登陆
- [x] 注册

### 工作台

- [x] 今天完成任务数量
- [x] 一周内完成任务数量
- [x] 一周内任务失败数量
- [x] 一周内任务总数量
- [x] 当月任务完成统计图

### 任务记录

- [x] 任务记录
- 两种模式：循环模式、时间段模式
  - [x] 循环模式
  - [x] 时间段模式
  - [x] 每天凌晨 🕛，后台根据模式，自动更新任务状态

### 用户

- [x] 更改用户头像与密码
- [x] 添加 Token 功能

### Token 的使用

根据相关 token 进行对应操作，把多平台信息汇总到个人平台（开发中...）
