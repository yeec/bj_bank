/**--------------------------------------------------------------------=====
 * 引入包说明
 * 1.控制台信息配置
 * 2.引入Koa文件
 */
// 1.控制台信息所需包
const color = require("colors-cli/safe");
const isInteractive = process.stdout.isTTY;
const clearConsole = require("react-dev-utils/clearConsole");
// 2.Koa文件包
const Koa = require("koa");
const app = new Koa();
const router = require("koa-router")();

/**--------------------------------------------------------------------=====
 * MOCK数据说明列表
 * 1.测试数据             /FetchDemo/FetchPostDemo.js
 */

// 1.测试数据
const FetchPostDemo = require("./FetchDemo/FetchPostDemo.js");
router.post("/mock/FetchPostDemo", async (ctx, next) => {
  ctx.response.body = FetchPostDemo;
});

/**--------------------------------------------------------------------=====
 * KOA配置项
 * 1.路由配置
 * 2.监听端口
 */
// 1.路由配置
app.use(router.routes());

// 2.监听端口
app.listen(3000, () => {
  // 控制台信息打印
  if (isInteractive) {
    clearConsole();
  }
  console.log(color.cyan("☺ MOCK数据服务启动成功 √ \n"));
  console.log(color.yellow("☺ 监听端口: 3000 \n☺ 监听目录: mock\n"));
});