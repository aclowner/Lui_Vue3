<template>
<div class="page">
    <div style="height:.32rem"></div>
    <lui-row name="姓名"><input type="text" v-model="data.name" ></lui-row>
    <lui-row name="部门选择"><lui-select :list="['市场部','开发部','运营部']" v-model="data.dept"></lui-select></lui-row>
    <lui-row name="出生日期"><lui-datetime v-model="data.birth"></lui-datetime></lui-row>
    <lui-row name="头像"><lui-file-img></lui-file-img></lui-row>
    <lui-row name="颜色选择">
        <lui-color v-model="data.color"></lui-color>
    </lui-row>

    <!-- <lui-row name="起始时间">
        <div class="col4"  style="padding-right:.2rem">
            <lui-datetime v-model="FYJS.s"></lui-datetime>
        </div>
        <div class="col4"  style="padding-right:.2rem">
            <lui-datetime v-model="FYJS.e"></lui-datetime>
        </div>
    </lui-row>
    
    <lui-row name="费用"><input type="text" :value="FY" ></lui-row> -->


    <lui-row name="性别"><lui-radio-group :list="['男','女']" v-model="data.sex"></lui-radio-group></lui-row>
    <lui-row name="爱好"><lui-checkbox-group :list="['游戏','美食','看书']" :index="-1" v-model="data.favo"></lui-checkbox-group></lui-row>
    <lui-row name="是否结婚"><lui-switch v-model="data.marry" on="已婚" off="未婚"></lui-switch></lui-row>
    <lui-row name="家庭地址">
        <div class="col4"  style="padding-right:.2rem">
            <lui-select :list="city1" :index="-1" v-model="data.Sheng" placeholder="省" @change="ssxchange(arguments,1)"></lui-select>
        </div>
        <div class="col4"  style="padding-right:.2rem">
            <lui-select :list="city2" :index="-1" v-model="data.Shi" placeholder="市" @change="ssxchange(arguments,2)"></lui-select>
        </div>
        <div class="col4" style="padding-right:.2rem">
            <lui-select :list="city3" :index="-1" v-model="data.Xian" placeholder="区/县"></lui-select>
        </div>
    </lui-row>
    <lui-row name="个人介绍"><textarea ></textarea></lui-row>

    <lui-row name="评价">
        <lui-star v-model="data.star" :total="5">{{data.star}}星</lui-star>&nbsp;&nbsp;
    </lui-row>

    

    <lui-row button>
        <button class="btn btn-border green" @click="save">保存</button>
        <button class="btn btn-border orange" @click="clear">清空</button>
    </lui-row>

    <!-- <lui-layer ref="layer" ></lui-layer> -->
</div>
</template>

<script>
import cityJson from "../assets/json/city.json"

export default {
    data(){
            return {
                data:{"Sheng":"江苏","Shi":"南京","Xian":"秦淮区",favo:"看书"},
                city1:cityJson,
                FYJS:{}
            }
        },
        created(){
            // Lui.Get({
            //     path:"src/asset/json/city.json",
            //     resultFormat:false
            // })
            // .then(re=>{
            //     this.city1 = re;
            // })
        },
        computed:{
            city2(){
                if(!this.data.Sheng || this.city1.length==0)
                    return [];
                return this.city1.find(o=>o.name==this.data.Sheng).City;
            },
            city3(){
                if(!this.data.Shi || this.city2.length==0)
                    return [];
                return this.city2.find(o=>o.name==this.data.Shi).County;
            },
            FY(){
                if(this.FYJS.s && this.FYJS.e){
                    console.log(this.FYJS.s,this.FYJS.e);
                    return Lui.FYJS(this.FYJS.s,this.FYJS.e);
                }                    
                return 0
            }
        },
        methods:{
            ssxchange(arg,t){
                this.data.Xian = "";
                if(t==1){
                    this.data.Shi = "";
                }
            },
            save(){
                 this.$refs.layer.alert(JSON.stringify(this.data));
            },
            clear(){
                this.data = {"Sheng":"","Shi":"","Xian":""};
            }
        },
        watch:{
        }
}
</script>

<style>

</style>