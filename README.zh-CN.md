# load-script-promise

[English](./README.md) | [简体中文](./README.zh-CN.md) 

增强版浏览器动态载入脚本文件库。新功能有：

    - 实现Promise API返回
    - 如果载入相同的脚本文件url，无论调用多少次载入指令，均保证只载入1次。
    - 简单的供应商载入机制（provider loader），可定制化的供应商载入结果检测，以及简单的供应商死循环依赖检测机制。

该库复刻和更改自[https://github.com/eldargab/load-script](https://github.com/eldargab/load-script)，在此鸣谢！

本库结构和开发模式兼容ES模块方式。

Npm包名称为`@horseluke/load-script-promise`。

## 安装

### 在浏览器独立使用模式（在html文件中直接引入）

非常简单！引入`dist`目录下的打包文件（repo中可以找到该目录），然后使用`loadScriptPromise`Object对象。

`loadScriptPromise`Object对象挂载在浏览器的`window`对象下.

```
<script src="./dist/loadScriptPromise.js"></script>
```

更多的使用方式和示例，请参见目录`/test/browser-test/cases`.

你可以打开`/test/browser-test/index.html`来观察它式如何工作的。

打开文档["Lib API"](./doc/zh-CN/browser-api/index.md)可查阅更多细节。


### 应用开发整合模式

首先，使用npm命令安装本包。

```
npm i @horseluke/load-script-promise
```

然后打开文档["Lib API"](./doc/zh-CN/lib-api/index.md)查阅更多细节。


### API

[请阅读`doc`目录下的文档](./doc/zh-CN/TOC.md)。


## 测试

本库使用mocha进行测试。


## 更新日志

[清查阅文档`CHANGELOG.md`。](./CHANGELOG.md).


## 协议

MIT