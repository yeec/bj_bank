import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import "lib-flexible";
// import "./index.less";
import Chujingjinrong from "./chujingjinrong";
// import registerServiceWorker from "./registerServiceWorker";
//promise polyfill
if (!window.Promise) {
  dependencies.push("es6-promise.auto.min.js");
}

ReactDOM.render(
  <AppContainer>
    <Chujingjinrong />
  </AppContainer>,
  document.getElementById("app")
);
//Service Worker是在后台运行的一个线程，可以用来处理离线缓存、消息推送、后台自动更新等任务。
// registerServiceWorker();
