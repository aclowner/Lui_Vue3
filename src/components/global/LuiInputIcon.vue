<template>
<div :class="['lui-input-icon','icon-pos-'+position]">   
    <slot></slot>
    <i v-if="icon" :class="['i-icon','icon',icon]" ></i>
</div>
</template>

<script>
export default {
    props:{
        icon:{default:""},
        position:{default:"right"}
    }
}
</script>

<style scoped>
.lui-input-icon{
    position: relative;
    width: 100%;
}
.i-icon{
    position: absolute;    
    font-size: .2rem;
    top: 50%;
    transform: translateY(-50%);
}
.icon-pos-left .i-icon{
    left: .1rem;
}
.icon-pos-right .i-icon{
    right: .1rem;
}
</style>