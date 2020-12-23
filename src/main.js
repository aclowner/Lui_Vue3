import "./assets/css/page.css"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "./lui/js/lui_3.0"
import http from "./lui/js/http"


import globalComponent from './components/global/'
import directive from "./components/directive/"


const app = createApp(App);

//添加全局指令、全局组件、路由
app.use(directive).use(globalComponent).use(router);

//全局变量
app.config.globalProperties.$http = http;

//挂载app
app.mount('#app');
