# Lib API

## Introduction

Lib apis通常用于应用开发整合模式。

事实上，browser apis其实是lib apis的导出。这是通过文件`index.js`实现的。

要使用lib apis，最快的方式是使用npm安装本包。

```
npm i @horseluke/load-script-promise
```

另一种不推荐的方法是手动复制整个`lib`目录到你的项目中。

安装完毕后，在项目中使用import指令即可。

## API List

通常而言，以下import指令是用得最多的：

从版本1.1.0开始：

```
//如果想载入指定脚本文件url并返回Promise API，请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.load`方法一致。
import {load} from "@horseluke/load-script-promise";

//如果想以传统模式载入指定脚本文件url，请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.loadTraditionMode`方法一致。
import {loadTraditionMode} from "@horseluke/load-script-promise";

//如果想注册一个供应商（provider），请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.setProvider`方法一致。
import {setProvider} from "@horseluke/load-script-promise";

//如果想载入一个供应商（provider），请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.loadProvider`方法一致。
import {loadProvider} from "@horseluke/load-script-promise";

```

从版本1.0.0开始：

```
//如果想载入指定脚本文件url并返回Promise API，请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.load`方法一致。
import loadScriptPromiseLoad from "@horseluke/load-script-promise/lib/load-script-promise/load";

//如果想以传统模式载入指定脚本文件url，请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.loadTraditionMode`方法一致。
import loadScriptTraditionMode from "@horseluke/load-script-promise/lib/load-script/load";

//如果想注册一个供应商（provider），请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.setProvider`方法一致。
import {set as setProvider} from "@horseluke/load-script-promise/lib/load-script-provider/providerListStore";

//如果想载入一个供应商（provider），请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.loadProvider`方法一致。
import loadProvider from "@horseluke/load-script-promise/lib/load-script-provider/loadProvider";

```


如果你手动把整个`lib`目录都复制到你的项目里面，请把`@horseluke/load-script-promise`改成正确的目录路径。
