<template>
<div class='form-row'>
    <div class='key' v-if='name&&name.length>0'>{{name}}</div>
    <div class='val'>
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    props:["name"],
}
</script>

<style>

</style>