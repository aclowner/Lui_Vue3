<template>
<lui-popup-body :title="'添加'+num" drag="true">
    <div class="form-panel">
        <lui-row name="名称1"><input type="text" v-model="num"></lui-row> 
        <lui-row name="名称2"><input type="text"></lui-row> 
        <lui-row name="名称3"><input type="text"></lui-row> 
        <lui-row name="打开">
            <button class="btn btn-border greeen mr1" @click="open">打开D2</button>
            <button class="btn btn-border greeen" @click="closeOpen">关闭D2</button>
        </lui-row>
        <div class="row-cols">
            <lui-row name="分列1"><input type="text"></lui-row> 
            <lui-row name="分列2"><input type="text"></lui-row> 
        </div>
    </div>      
    <template v-slot:footer>
        <lui-row button >
        <button class="btn btn-border  blue" @click="save">保存</button>
        <button class="btn btn-border " @click="close">取消</button>
        <button class="btn btn-border " @click="closeAll">全部关闭</button>
    </lui-row> 
    </template>
    
</lui-popup-body>
</template>

<script>
export default {
    name:"popup-form",
    data(){
        return {
            num:0
        }            
    },
    methods:{
        fnForm1(p1,p2,p3){
            console.log("this is form fnForm1: p1,p1,p2：",p1,p2,p3 )
        },
        close(){
            this.$emit("close");
        },
        closeAll(){
            this.$emit("close-all");
        },
        open(){
            this.$emit("open","popupD2");
        },
        closeOpen(){
            this.$emit("sibling",{"popupD2":"close"});
        },
        save(){
            this.$http.post({
                url:"/api_wl_catchpit/api/service",
                data:{"sprams":{"dbFun":"bsGetSiteList","parms":{"Latitude":32.15465,"Longitude":118.69543,"UserId":"3"}}}
            })
                .then(re=>{
                Lui.Hit("成功成功")
                console.log(re);
            })
            this.$emit("send",{popup:"PopupForm",data:{a:1,b:2}})
        }
    }
}
</script>

<style>

</style>