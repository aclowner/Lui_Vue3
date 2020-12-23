<template>
<div class="radio-group">
    <a :class="['radio',{checked:checkVal==ck[0]}]" v-for="(ck,ci) in optionArr" :key="ci" @click="ckClick(ci,ck)">
        <span>{{ck[1]}}</span>    
    </a>
</div>
</template>

<script>
export default {
    name:"lui-radio-group",
    props:{
        modelValue:"",
        list:Array,
        index:{default:0}
    },
    data(){
        return {
            optionArr:[],
            checkVal:""
        }
    },
    methods:{
        ckClick(i,o){      
            this.checkVal = o[0];
            this.$emit("update:modelValue",this.checkVal);
        }
    },
    watch:{
        modelValue:{
            handler:function(nv,ov){
                let newVal = nv ? nv+"" : "";
                if(newVal != this.checkVal)
                    this.checkVal = newVal;
            },
            immediate: true
        },
        list:{
            handler(nv,ov){
                if(JSON.stringify(nv) == JSON.stringify(ov))   
                    return;         
                this.optionArr = Lui.TransListData(nv,this.index);
            },
            immediate:true
        }
    }
}
</script>

<style>

</style>