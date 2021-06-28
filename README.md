> CODE：View code on [GitHub](https://github.com/maghsk/AttentionDetectionFrontend)!
>
> DEMO：Try out Hawkeye demo on [github.io](https://maghsk.github.io/AttentionDetectionFrontend/)!

# Hawkeye：JavaScript 程序设计课程项目

受疫情影响，不少线下课程、线下会议都改为了线上的形式。然而线上教学与讨论的最大问题是：相较于线下的形式，参与者更容易分心、失去专注力。本项目可以为有特殊需求的教学者提供注意力检测功能。

![lightmode](https://markdown-1252899564.cos.ap-beijing.myqcloud.com/typora/img/maghsk.github.io_AttentionDetectionFrontend_light.webp)

![darkmode](https://markdown-1252899564.cos.ap-beijing.myqcloud.com/typora/img/maghsk.github.io_AttentionDetectionFrontend_dark.webp)

## 前端部署

```bash
git clone https://github.com/maghsk/AttentionDetectionFrontend
cd AttentionDetectionFrontend
npm install
npm run build
serve -s build
```

也可以访问 [Hawkeye](https://maghsk.github.io/AttentionDetectionFrontend/) 来测试在线DEMO！

## 后端部署

（后端使用的模型非常简单：仅仅通过表情判断用户专注度，因这部分不是本课程重点，所以做的相对比较简易）

repo：[AttentionDetectionBackend](https://github.com/maghsk/AttentionDetectionBackend)

```bash
git clone https://github.com/maghsk/AttentionDetectionBackend
cd AttentionDetectionBackend
# install conda and required packages
python3 ./src/main.py --use-rand 1
```

需要注意当前端部署在https协议之后时，后端需要解决https访问http的url的问题。建议解决的方法有：

1. 反向代理；
2. 为flask加入TLS证书和密钥；
3. 将后端开在本地，监听127.0.0.1；

## 特点介绍

- 支持使用正则表达式通过名称检索后端用户；
  - 检索时采用懒惰查询，只有当用户停止输入一段时间后才真正执行查询；
- 使用RESTful API，前后端交互相对便捷；
- 适配暗色模式；
- 使用react.js框架开发，UI设计选择echarts.js和Material Design，兼顾效率和美观。

