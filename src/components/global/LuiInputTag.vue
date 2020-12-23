<template>
<div class="lui-input-tag">
    <span class="tag before" v-if="before">{{before}}</span>
    <slot></slot>
    <span class="tag after" v-if="after">{{after}}</span>
</div>
</template>

<script>
export default {
    props:{
        before:{default:""},
        after:{default:""}
    }
}
</script>

<style>

</style>