<template>
    <div class="page flex column center">
        <img src="../assets/img/logo.png" alt="">
        <span class="s1">Vue+NameSpace+Lui</span>
        <span class="s2">B端Vue UI组件库，B端运行编译Vue组件、动态导入JS，常用JavaScript原型扩展</span>

        <router-link class="btn-start" to="/button">开始</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.page{
    height: 100%;
}
.s1{
    font-size: .32rem;
    line-height: 3;
    color: var(--active-color);
}
.s2{
    font-size: .20rem;
    line-height: 4;
}
</style>