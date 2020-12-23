<template>
<div class="page content">
    <h3><a >tree-select</a></h3>
    <ul>
        <li>
            <p>树列表</p>
            <div class="p" style="max-height:50vh;">
                <lui-tree :list="tree"></lui-tree>
            </div>
        </li>
        <li>
            <p>树列表勾选</p>
            <div class="p" style="max-height:50vh;">
                <lui-tree :list="tree" :check="true" v-model="val"></lui-tree>
            </div>
            <p>
                <lui-input-tag before="绑定值"><input type="text" :value="val"></lui-input-tag>
            </p>
        </li>
    </ul>
</div>
</template>

<script>
import treeJson from "../assets/json/tree.json";
export default {
    data(){
        return {
            tree:treeJson.toTree(),
            val:""
        }
    }
}
</script>

<style>

</style>