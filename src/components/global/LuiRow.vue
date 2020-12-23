<template>

<div class="lui-row">
    <div class='key' v-if='name&&name.length>0' :style="{width:keyWidth}">{{name}}</div>
    <div class='val'>
        <slot></slot>
    </div>
</div>

</template>

<script>
export default {
    props:{
        name:{default:""},
        keyWidth:{default:"1.4rem"}
    }
}
</script>

<style>
.lui-row{
    flex: 1;
    display: flex;
    line-height: 2.5;
    margin-bottom: .2rem;        
}
.lui-row>.key{
    text-align: right;
    padding-right: .2rem;    
}
.lui-row>.key:after{
    content: ":";
    margin-left: .04rem;
}
.lui-row>.val{
    flex: 1;
    padding-right: .36rem;
    display: flex;
}
.lui-row[button]{
    padding: .05rem 0;
}
.lui-row[button]>.val{
    padding: 0;
    justify-content: center;
}
.lui-row[button] .btn{
    margin: 0 .1rem;
}

.row-cols{
    display: flex;
}
</style>