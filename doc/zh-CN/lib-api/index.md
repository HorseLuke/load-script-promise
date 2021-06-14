# Lib API

## 介绍

Lib apis通常用于应用开发整合模式。

此处待细节补充。

不过你可以打开文件`index.js`来观察它是如何工作的。

通常而言，以下import指令是用得最多的：

```
//如果想载入指定脚本文件url并返回Promise API，请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.load`方法一致。
import loadScriptPromiseLoad from "<load-script-promise>/lib/load-script-promise/load";

//如果想以传统模式载入指定脚本文件url，请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.loadTraditionMode`方法一致。
import loadScriptTraditionMode from "<load-script-promise>/lib/load-script/load";

//如果想注册一个供应商（provider），请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.setProvider`方法一致。
import {set as setProvider} from "<load-script-promise>/lib/load-script-provider/providerListStore";

//如果想载入一个供应商（provider），请使用这个import指令。
//本指令导入的方法和dist目录文件中的`loadScriptPromise.loadProvider`方法一致。
import loadProvider from "<load-script-promise>/lib/load-script-provider/loadProvider";

```

请把 `<load-script-promise>`改成`@horseluke/load-script-promise`（如果该库已经发布到npm，并且以npm形式安装）或者目录路径（如果你手动把整个`lib`目录都复制到你的项目里面）。
