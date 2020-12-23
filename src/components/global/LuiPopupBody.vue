<template>
<div :class="['lui-popup',{'popup-drag':isdrag.parent==true}]" @mousedown="setActive">
    <div class="lui-popup-title flex" v-drag:[isdrag]="drag||false">
        <span>{{title}}</span>
        <a class="icon i-close" @click.stop="close()"></a>
    </div>
    <div class="lui-popup-body">
        <div class="_scroll"><div class="_con">
            <slot></slot>
        </div></div>                    
    </div>
    <div class="lui-popup-bottom flex">
        <slot name="footer"></slot>
    </div>
</div>
</template>

<script>
export default {
    name:"lui-popup-body",
    props:["title","drag"],
    computed:{
        isdrag(){
            return {parent:this.drag||false};
        }
    },
    methods:{
        close(){
            this.$parent.$emit("close");
        },
        setActive(){
            this.$parent.$emit("active");
        }
    }
}
</script>

<style scoped>
.lui-popup{
    top: calc(50% - 5vh);
}

.lui-popup-title, .lui-popup-bottom{
    font-size: .18rem;
    line-height: .5rem;
    align-items: center;
}
.lui-popup-title{
    border-bottom: solid 1px #eff0f2;
    justify-content: space-between;  
    padding: 0 .2rem;  
    cursor: default;
}
.popup-drag .lui-popup-title{
    cursor: move;
}
.lui-popup-title .i-close{
    font-size: .22rem;
}

.lui-popup-body{
    width: 52vw;
}
.lui-popup-bottom{
    justify-content: center;
}
.icon-close{
    font-size: .24rem;
    line-height: 1;
    cursor: pointer;
}
</style>