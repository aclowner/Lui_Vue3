<template>
  <div class="top flex">
    <div class="logo flex">
        <img class="img-logo" src="./assets/img/logo.png" alt="">
        <span class="span-logo">LAZY UI</span>
    </div>
  </div>

  <div class="body flex">
    <div class="left">
          <scroll>                
              <ul class="ul-menu">                    
                  <li v-for="a in menus" :key="a.id">
                      <span v-if="a.type==1" :class="['a-menu','at1']">{{a.name}}</span>
                      <router-link v-else :to="a.page" exact-active-class="active" :class="['a-menu','at2']" @click="active=a.id">
                          {{a.name}}
                      </router-link>                        
                  </li>
              </ul>
              
          </scroll>
      </div>

      <div class="right">
          <scroll>
              <transition mode="out-in" name="fade">
                  <router-view :route="route"></router-view>
              </transition>
          </scroll>
      </div>
  </div>
</template>

<script>
import MenuData from "./assets/json/menu.json"

export default {
  data(){
    return {
      menus: MenuData,
    }    
  },
  created(){

    // this.$http.post({
    //   url:"/wl_projectMa_api/api/service",
    //   data:{"sprams":{"dbFun":"bsGetProjectList","parms":{"UserId":"11"}}},
    //   ssss:"test"
    // })
    // .then(response => {
    //   // 此处为post请求完成后的操作，比如提示操作成功、页面跳转等
    //   console.log("end",response);
    //   console.log("操作成功！");
    // })

    // this.$http.post({
    //   url:"/api_wl_catchpit/api/service",
    //   data:{"sprams":{"dbFun":"bsGetSiteList","parms":{"Latitude":32.15465,"Longitude":118.69543,"UserId":"3"}}}
    // })
    // .then(re=>{
    //   Lui.Hit("成功成功")
    //   console.log(re);
    // })
  }
}
</script>

<style>

</style>