# Rollup
### 快速上手
1. 安装rollup
```
npm init -y 
npm i rollup
```
2. 新增 src/index.js 和 src/util.js 和rollup.config.mjs 
```
.
├── package.json
├── pnpm-lock.yaml
├── rollup.config.js
└── src
    ├── index.js
    └── util.js
```
3.  文件的内容
```
// src/index.js
import { add } from "./util";
console.log(add(1, 2));

// src/util.js
export const add = (a, b) => a + b;

export const multi = (a, b) => a * b;
// rollup.config.js
// 以下注释是为了能使用 VSCode 的类型提示
/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
  input: ["src/index.js"],
  output: {
    // 产物输出目录
    dir: "dist/es",
    // 产物格式
    format: "esm",
  },
};

export default buildOptions;
```
4. package.json配置脚本
```
{
  // rollup 打包命令，`-c` 表示使用配置文件中的配置
  "build": "rollup -c"
}
```
### 常用配置解读
1. 多产物配置
```
// rollup.config.js
/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
  input: ["src/index.js"],
  // 将 output 改造成一个数组
  output: [
    {
      dir: "dist/es",
      format: "esm",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
    },
  ],
};
export default buildOptions;
```
2. 多入口配置
```
{
  input: ["src/index.js", "src/util.js"]
}
```
3. 自定义output配置
常用的配置项
```
output: {
  // 产物输出目录
  dir: path.resolve(__dirname, 'dist'),
  // 以下三个配置项都可以使用这些占位符:
  // 1. [name]: 去除文件后缀后的文件名
  // 2. [hash]: 根据文件名和文件内容生成的 hash 值
  // 3. [format]: 产物模块格式，如 es、cjs
  // 4. [extname]: 产物后缀名(带`.`)
  // 入口模块的输出文件名
  entryFileNames: `[name].js`,
  // 非入口模块(如动态 import)的输出文件名
  chunkFileNames: 'chunk-[hash].js',
  // 静态资源文件输出文件名
  assetFileNames: 'assets/[name]-[hash][extname]',
  // 产物输出格式，包括`amd`、`cjs`、`es`、`iife`、`umd`、`system`
  format: 'cjs',
  // 是否生成 sourcemap 文件
  sourcemap: true,
  // 如果是打包出 iife/umd 格式，需要对外暴露出一个全局变量，通过 name 配置变量名
  name: 'MyBundle',
  // 全局变量声明
  globals: {
    // 项目中可以直接用`$`代替`jquery`
    jquery: '$'
  }
}
```
4. 依赖 external
对于某些第三方包，有时候我们不想让 Rollup 进行打包，也可以通过 external 进行外部化:
```
{
  external: ['react', 'react-dom']
}
```
5. 接入插件能力
引入额外的插件去解决这个问题
```
npm i @rollup/plugin-node-resolve @rollup/plugin-commonjs 
```
- @rollup/plugin-node-resolve是为了允许我们加载第三方依赖，否则像import React from 'react' 的依赖导入语句将不会被 Rollup 识别。
- @rollup/plugin-commonjs 的作用是将 CommonJS 格式的代码转换为 ESM 格式
在配置文件中导入这些插件
```
// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

/**
 * @type { import('rollup').RollupOptions }
 */
export default {
  input: ["src/index.js"],
  output: [
    {
      dir: "dist/es",
      format: "esm",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
    },
  ],
  // 通过 plugins 参数添加插件
  plugins: [resolve(), commonjs()],
};
```
在 Rollup 配置文件中，plugins除了可以与 output 配置在同一级，也可以配置在 output 参数里面，
```
// rollup.config.js
import { terser } from 'rollup-plugin-terser'
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
export default {
  output: {
    // 加入 terser 插件，用来压缩代码
    plugins: [terser()]
  },
  plugins: [resolve(), commonjs()]
}
```
###  Rollup 插件库
- @rollup/plugin-json： 支持.json的加载，并配合rollup的Tree Shaking机制去掉未使用的部分，进行按需打包。
- @rollup/plugin-babel：在 Rollup 中使用 Babel 进行 JS 代码的语法转译。
- @rollup/plugin-typescript: 支持使用 TypeScript 开发。
- @rollup/plugin-alias：支持别名配置。
- @rollup/plugin-replace：在 Rollup 进行变量字符串的替换。
- rollup-plugin-visualizer: 对 Rollup 打包产物进行分析，自动生成产物体积可视化分析图。
### JavaScript API 方式调用
1. rollup.rollup
```
// build.js
const rollup = require("rollup");
// 常用 inputOptions 配置
const inputOptions = {
  input: "./src/index.js",
  external: [],
  plugins:[]
};
const outputOptionsList = [
  // 常用 outputOptions 配置
  {
    dir: 'dist/es',
    entryFileNames: `[name].[hash].js`,
    chunkFileNames: 'chunk-[hash].js',
    assetFileNames: 'assets/[name]-[hash][extname]',
    format: 'es',
    sourcemap: true,
    globals: {
      lodash: '_'
    }
  }
  // 省略其它的输出配置
];
async function build() {
  let bundle;
  let buildFailed = false;
  try {
    // 1. 调用 rollup.rollup 生成 bundle 对象
    bundle = await rollup.rollup(inputOptions);
    for (const outputOptions of outputOptionsList) {
      // 2. 拿到 bundle 对象，根据每一份输出配置，调用 generate 和 write 方法分别生成和写入产物
      const { output } = await bundle.generate(outputOptions);
      await bundle.write(outputOptions);
    }
  } catch (error) {
    buildFailed = true;
    console.error(error);
  }
  if (bundle) {
    // 最后调用 bundle.close 方法结束打包
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

build();
```
- 通过 rollup.rollup方法，传入 inputOptions，生成 bundle 对象；
- 调用 bundle 对象的 generate 和 write 方法，传入outputOptions，分别完成产物和生成和磁盘写入。
- 调用 bundle 对象的 close 方法来结束打包。
2. rollup.watch
```
// watch.js
const rollup = require("rollup");
const watcher = rollup.watch({
  // 和 rollup 配置文件中的属性基本一致，只不过多了`watch`配置
  input: "./src/index.js",
  output: [
    {
      dir: "dist/es",
      format: "esm",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
    },
  ],
  watch: {
    exclude: ["node_modules/**"],
    include: ["src/**"],
  },
});

// 监听 watch 各种事件
watcher.on("restart", () => {
  console.log("重新构建...");
});

watcher.on("change", (id) => {
  console.log("发生变动的模块id: ", id);
});

watcher.on("event", (e) => {
  if (e.code === "BUNDLE_END") {
    console.log("打包信息:", e);
  }
});
```
可以通过执行node watch.js开启 Rollup 的 watch 打包模式，当你改动一个文件后可以看到如下的日志，说明 Rollup 自动进行了重新打包
