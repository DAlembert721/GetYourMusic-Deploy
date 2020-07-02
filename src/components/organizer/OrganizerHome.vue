<template>

    <Table class="ma-5" :drawer="drawer"></Table>

</template>

<script>
    import Table from "./Table";

    export default {
        name: "OrganizerHome",
        components: {
            Table
        },
        data: () => ({
            drawer: true
        })
    }
</script>

<style scoped>
    section {
        height: 100%;
        width: 100%;
        color: #ffff;
        background: linear-gradient(45deg, #c074b2, #8ab5e8);
        margin: 0;
        overflow-y: scroll;
        position: absolute;
        display: inline-table;
        background-attachment: fixed;
    }
</style>
