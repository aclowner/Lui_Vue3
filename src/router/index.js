import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import(/* webpackChunkName: "button" */ '../views/ButtonPage.vue')
  },
  {
    path: '/input',
    name: 'Input',
    component: () => import(/* webpackChunkName: "input" */ '../views/InputPage.vue')
  },
  {
    path: '/check',
    name: 'Check',
    component: () => import(/* webpackChunkName: "check" */ '../views/CheckPage.vue')
  },
  {
      path:"/select",
      name:"select",
      component:() => import(/* webpackChunkName: "select" */ '../views/SelectPage.vue'),
  },
  {
      path:"/date",
      name:"date",
      component:() => import(/* webpackChunkName: "date" */ '../views/DatePage.vue'),
  },
  {
      path:"/file",
      name:"file",
      component:() => import(/* webpackChunkName: "file" */ '../views/FilePage.vue'),
  },
  {
      path:"/form",
      name:"form",
      component:() => import(/* webpackChunkName: "form" */ '../views/FormDemoPage.vue'),
  },
  {
      path:"/table",
      name:"table1",
      component:() => import(/* webpackChunkName: "table1" */ '../views/TablePage1.vue'),
  },
  {
      path:"/table2",
      name:"table2",
      component:() => import(/* webpackChunkName: "table2" */ '../views/TablePage2.vue'),
  },
  {
      path:"/tree",
      name:"tree",
      component:() => import(/* webpackChunkName: "tree" */ '../views/TreePage.vue'),
  },
  {
      path:"/popupPage",
      name:"popupPage",
      component:() => import(/* webpackChunkName: "popupPage" */ '../views/PopupPage.vue'),
  },
  {
      path:"/prototypeInt",
      name:"prototypeInt",
      component:() => import(/* webpackChunkName: "prototypeInt" */ '../views/PrototypeInt.vue'),
  },
  {
      path:"/prototypeString",
      name:"prototypeString",
      component:() => import(/* webpackChunkName: "prototypeString" */ '../views/PrototypeString.vue'),
  },
  {
      path:"/prototypeArray",
      name:"prototypeArray",
      component:() => import(/* webpackChunkName: "prototypeArray" */ '../views/PrototypeArray.vue'),
  },
  {
      path:"/prototypeDate",
      name:"prototypeDate",
      component:() => import(/* webpackChunkName: "prototypeArray" */ '../views/PrototypeDate.vue'),
  },
  {
      path:"/prototypeFile",
      name:"prototypeFile",
      component:() => import(/* webpackChunkName: "prototypeArray" */ '../views/PrototypeFile.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
