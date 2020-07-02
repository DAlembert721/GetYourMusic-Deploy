<template>
    <v-list-item :to="item.to" color="purple lighten-2" @click="$emit('drawerChanged',false)">
        <v-img :src="require(`../../assets/Img/${item.icon}.png`)" :alt="item.title + ' logo'"
               height="20" width="20"></v-img>
        <div class="mx-2"></div>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
</template>

<script>
    export default {
        name: "SideBarItem",
        props: {
            item: Object
        }
    }
</script>

<style scoped>

</style>
