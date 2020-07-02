<template>
    <section>
        <Navigation :userType="userType"></Navigation>
        <v-main>
            <Home :userType="userType"></Home>
        </v-main>

    </section>

</template>

<script>
    import Home from "@/components/Home";
    import Navigation from "@/components/navigation/Navigation";
    export default {
        name: "Main",
        components: {Home,Navigation},
        props: {
            userType: null,
            isLog: Boolean
        }
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
