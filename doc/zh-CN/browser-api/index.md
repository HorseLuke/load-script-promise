# Browser API

## 介绍

在浏览器独立使用模式（在html文件中直接引入），这些api是暴露在`loadScriptPromise`Object对象中，该对象挂载在浏览器的`window`对象下.

```
<!-- loadScriptPromise.js is for development -->
<script src="/dist/loadScriptPromise.min.js"></script>
```

## API列表

### 载入script file，并以Promise API返回

  - [loadScriptPromise.load(url[, opt])](./loadScriptPromise.load.md)

### 不使用Promise API通知载入结果来载入script file

  - [loadScriptPromise.loadTraditionMode(url[, opts[, cb]])](./loadScriptPromise.loadTraditionMode.md)

### 供应商载入器（Provider loader）

  - [loadScriptPromise.setProvider(id, option)](./loadScriptPromise.setProvider.md)
  - [loadScriptPromise.loadProvider(id)](./loadScriptPromise.loadProvider.md)

## 附录

  - [关于自定义供应商载入结果检测器](./appendix-customize-provider-load-result-detector.md)