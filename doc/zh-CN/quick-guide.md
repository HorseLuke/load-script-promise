# `load-script-promise`快速入门指南

## 简介

欢迎使用`load-script-promise`库！这是一个增强版浏览器动态载入脚本文件库。新功能有：

    - 实现Promise API返回
    - 如果载入相同的脚本文件url，无论调用多少次载入指令，均保证只载入1次。
    - 简单的供应商载入机制（provider loader），可定制化的供应商载入结果检测，以及简单的供应商死循环依赖检测机制。

该库复刻和更改自[https://github.com/eldargab/load-script](https://github.com/eldargab/load-script)，在此鸣谢！

本库结构和开发模式兼容ES模块方式。

## 依赖

建议拥有Promise API环境，浏览器支持Promise API或者使用Promise polyfill均可。 

如果你不想使用Promise API，或者浏览器不支持Promise API，只有`loadScriptPromise.loadTraditionMode`可以用于载入动态脚本文件。 

`loadScriptPromise.loadTraditionMode`的参数和[https://github.com/eldargab/load-script](https://github.com/eldargab/load-script)保持一致。

## 浏览器兼容性

浏览器兼容性定义在文件`.babelrc`目前支持chrome >= 40，safari >= 9。

## 安装

### 在浏览器独立使用模式（在html文件中直接引入）

非常简单！引入`dist`目录下的打包文件（repo中可以找到该目录），然后使用`loadScriptPromise`Object对象。

`loadScriptPromise`Object对象挂载在浏览器的`window`对象下.

```
<script src="./dist/loadScriptPromise.js"></script>
```

更多的使用方式和示例，请参见目录`/test/browser-test/cases`.

你可以打开`/test/browser-test/index.html`来观察它式如何工作的。


### 应用开发整合模式

首先，使用npm命令安装本包。

```
npm i @horseluke/load-script-promise
```

然后打开文档["Lib API"](./lib-api/index.md)查阅更多细节。

## Browser API

在浏览器独立使用模式（在html文件中直接引入）中，Browser apis通过挂载在`window`对象下的`loadScriptPromise`对象实现。

请参阅文档["Browser API"](./browser-api/index.md)。

## Lib API

请参阅文档["Lib API"](./lib-api/index.md)。

## 测试

本库使用mocha进行测试。

### 浏览器端测试

mocha在浏览器端测试`dist`目录下发布的打包库文件。

相关文件位于`/test/browser-test/`。

你可以打开`/test/browser-test/index.html`来观察是如何工作的。

### Node端测试

mocha在node端测试`lib`目录下的部分代码逻辑，c8用于代码覆盖测试。

相关文件位于`/test/node-test/`。

## 协议

MIT