# Esbuild
### 为什么 Esbuild 性能极高
1. 使用 Golang 开发
2. 多核并行
3. 从零造轮子
4. 高效的内存利用
## Esbuild 功能使用
### 项目打包——Build API
接下来我们正式学习 Esbuild 的功能使用。首先我们执行pnpm init -y新建一个项目, 然后通过如下的命令
1. 完成 Esbuild 的安装
```
npm i esbuild
```
2. 新建build.js文件(build方法)
```
const { build, buildSync, serve } = require("esbuild");

async function runBuild() {
  // 异步方法，返回一个 Promise
  const result = await build({
    // ----  如下是一些常见的配置  --- 
    // 当前项目根目录
    absWorkingDir: process.cwd(),
    // 入口文件列表，为一个数组
    entryPoints: ["./src/index.jsx"],
    // 打包产物目录
    outdir: "dist",
    // 是否需要打包，一般设为 true
    bundle: true,
    // 模块格式，包括`esm`、`commonjs`和`iife`
    format: "esm",
    // 需要排除打包的依赖列表
    external: [],
    // 是否开启自动拆包
    splitting: true,
    // 是否生成 SourceMap 文件
    sourcemap: true,
    // 是否生成打包的元信息文件
    metafile: true,
    // 是否进行代码压缩
    minify: false,
    // 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包
    watch: false,
    // 是否将产物写入磁盘
    write: true,
    // Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
    // 针对一些特殊的文件，调用不同的 loader 进行加载
    loader: {
      '.png': 'base64',
    }
  });
  console.log(result);
}

runBuild();
```
buildSync方法的使用几乎相同，不推荐大家使用 buildSync 这种同步的 API，它们会导致两方面不良后果。一方面容易使 Esbuild 在当前线程阻塞，丧失并发任务处理的优势。另一方面，Esbuild 所有插件中都不能使用任何异步操作，这给插件开发增加了限制
#### serve
1. 开启 serve 模式后，将在指定的端口和目录上搭建一个静态文件服务，这个服务器用原生 Go 语言实现，性能比 Nodejs 更高。
2. 类似 webpack-dev-server，所有的产物文件都默认不会写到磁盘，而是放在内存中，通过请求服务来访问。
3. 每次请求到来时，都会进行重新构建(rebuild)，永远返回新的产物。
>值得注意的是，触发 rebuild 的条件并不是代码改动，而是新的请求到来。
```
const { build, buildSync, serve } = require("esbuild");
function runBuild() {
  serve(
    {
      port: 8000,
      // 静态资源目录
      servedir: './dist'
    },
    {
      absWorkingDir: process.cwd(),
      entryPoints: ["./src/index.jsx"],
      bundle: true,
      format: "esm",
      splitting: true,
      sourcemap: true,
      ignoreAnnotations: true,
      metafile: true,
    }
  ).then((server) => {
    console.log("HTTP Server starts at port", server.port);
  });
}

runBuild();
```
每次在浏览器请求都会触发 Esbuild 重新构建，而每次重新构建都是一个增量构建的过程，耗时也会比首次构建少很多(一般能减少 70% 左右)

###  单文件转译——Transform API
```
const { transform, transformSync } = require("esbuild");

async function runTransform() {
  // 第一个参数是代码字符串，第二个参数为编译配置
  const content = await transform(
    "const isNull = (str: string): boolean => str.length > 0;",
    {
      sourcemap: true,
      loader: "tsx",
    }
  );
  console.log(content);
}

runTransform();
```
### Esbuild 插件开发
>Esbuild 插件结构被设计为一个对象，里面有name和setup两个属性，name是插件的名称，setup是一个函数，其中入参是一个 build 对象，这个对象上挂载了一些钩子可供我们自定义一些钩子函数逻辑
```
let envPlugin = {
    name: 'env',
    setup(build) {
        build.onResolve({ filter: /^env$/ }, args => ({
        path: args.path,
        namespace: 'env-ns',
        }))

        build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
        contents: JSON.stringify(process.env),
        loader: 'json',
        }))
    },
}

require('esbuild').build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'out.js',
  // 应用插件
  plugins: [envPlugin],
}).catch(() => process.exit(1))

// 应用了 env 插件后，构建时将会被替换成 process.env 对象
import { PATH } from 'env'

console.log(`PATH is ${PATH}`)
```
#### 钩子函数的使用
1. onResolve 钩子 和 onLoad钩子 分别控制路径解析和模块内容加载的过程。
两个钩子函数中都需要传入两个参数: Options 和 Callback
```
interface Options {
  filter: RegExp;
  namespace?: string;
}
```
2. 其他钩子
在 build 对象中，除了onResolve和onLoad，还有onStart和onEnd两个钩子用来在构建开启和结束时执行一些自定义的逻辑，使用上比较简单
```
let examplePlugin = {
  name: 'example',
  setup(build) {
    build.onStart(() => {
      console.log('build started')
    });
    build.onEnd((buildResult) => {
      if (buildResult.errors.length) {
        return;
      }
      // 构建元信息
      // 获取元信息后做一些自定义的事情，比如生成 HTML
      console.log(buildResult.metafile)
    })
  },
}
```
- onStart 的执行时机是在每次 build 的时候，包括触发 watch 或者 serve模式下的重新构建。
- onEnd 钩子中如果要拿到 metafile，必须将 Esbuild 的构建配置中metafile属性设为 true。
#### 实战 1: CDN 依赖拉取插件
```
module.exports = () => ({
    name: "esbuild:http",
    setup(build){
        let https = require("https")
        let http = require("http")
        // 拦截请求
        build.onResolve({ filter: /^https?:\/\// }, (args) => ({
            // path: args.path,   重写路径
            path: new URL(args.path, args.importer).toString(),
            namespace: "http-url",
        }));
        // 通过fetch请求加载CDN资源
        build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
            let contents = await new Promise((resolve, reject) => {
                function fetch(url) {
                    let lib = url.startsWith("https") ? https : http;
                    let req = lib.get(url, (res) => {
                        if ([301, 302, 307].includes(res.statusCode)) {
                            // 重定向
                            fetch(new URL(res.headers.location, url).toString());
                            req.abort();
                        } else if (res.statusCode === 200) {
                            // 响应成功
                            let chunks = [];
                            res.on("data", (chunk) => chunks.push(chunk));
                            res.on("end", () => resolve(Buffer.concat(chunks)));
                        } else {
                            reject(
                            new Error(`GET ${url} failed: status ${res.statusCode}`)
                            );
                        }
                    }).on("error", reject)
                }
                fetch(args.path)
            }
            return { contents };
        })
    }
})
```
新建build.js文件
```
const { build } = require("esbuild");
const httpImport = require("./http-import-plugin");
async function runBuild() {
  build({
    absWorkingDir: process.cwd(),
    entryPoints: ["./src/index.jsx"],
    outdir: "dist",
    bundle: true,
    format: "esm",
    splitting: true,
    sourcemap: true,
    metafile: true,
    plugins: [httpImport()],
  }).then(() => {
    console.log("🚀 Build Finished!");
  });
}
runBuild();
```

#### 实战 2: 实现 HTML 构建插件
```
const fs = require("fs/promises")
const path = require("path")
cosnt { createScript, createLink, gengerateHTML } = require("./util")
module.export = () =>{
    return {
        name: 'esbuild:html',
        setup(build){
            build.onEnd(async(buildResult)=>{
                if(buildResult.errors.length){
                    return 
                }
                const {metafile} = buildResult
                // 1. 拿到 metafile 后获取所有的 js 和 css 产物路径
                const script= []
                const links = []
                if (metafile) {
                    const { outputs } = metafile;
                    const assets = Object.keys(outputs);
                    assets.forEach((asset) => {
                        if (asset.endsWith(".js")) {
                            scripts.push(createScript(asset));
                        } else if (asset.endsWith(".css")) {
                            links.push(createLink(asset));
                        }
                    });
                }
                // 2. 拼接 HTML 内容
                const templateContent = generateHTML(scripts, links);
                 // 3. HTML 写入磁盘
                const templatePath = path.join(process.cwd(), "index.html");
                await fs.writeFile(templatePath, templateContent);
            })
        }
    }
}
```
utils
```
// 一些工具函数的实现
const createScript = (src) => `<script type="module" src="${src}"></script>`;
const createLink = (src) => `<link rel="stylesheet" href="${src}"></link>`;
const generateHTML = (scripts, links) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Esbuild App</title>
  ${links.join("\n")}
</head>

<body>
  <div id="root"></div>
  ${scripts.join("\n")}
</body>

</html>
`;
module.exports = { createLink, createScript, generateHTML };
```
使用
```
const html = require("./html-plugin");
// esbuild 配置
plugins: [
  // 省略其它插件
  html()
],

// 1. 全局安装 serve
npm i -g serve
// 2. 在项目根目录执行
serve .
```