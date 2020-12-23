<template>
<div class="lui-tree">
    <scroll>
        <lui-tree-item v-for="item in list" :key="item.id" :data="item" :check="check" :check-arr="valArr"></lui-tree-item>    
    </scroll>  
</div>
</template>

<script>
import LuiTreeItem from "./LuiTreeItem.vue";
export default {
    props:{
        list:Array,
        check:{default:false},
        modelValue:{default:""},
    },
    data(){
        return {
            valArr:[],
        }
    },
    watch:{
        modelValue:{
            handler(nv){
                if(nv != this.valArr.join(","))
                    this.valArr = nv.join(",");
            },
            immediate:true
        },
        valArr(nv){
            this.$emit("update:modelValue",nv.join(","))
        }
    },
    components:{
        LuiTreeItem
    }
}
</script>

<style scoped>
.lui-tree{
    height: auto;
    width: 100%;
}
</style>