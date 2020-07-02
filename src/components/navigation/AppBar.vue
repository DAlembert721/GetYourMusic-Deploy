<template>
    <v-app-bar class="our-toolbar" dense>
        <v-app-bar-nav-icon @click.stop="$emit('drawerChanged',true)"></v-app-bar-nav-icon>
        <v-toolbar-title style="cursor: pointer" @click="goToHome">Get Your Music</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn outlined color="purple lighten-2" @click.prevent="logout">Log out</v-btn>
    </v-app-bar>
</template>

<script>


    export default {
        name: "AppBar",
        methods: {
            goToHome() {
                this.$router.push({name: 'home'});
            },
            logout() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>
    .our-toolbar {
        /* background-color: #424242; */
        background-color: white;
        color: #945bfc;
    }
</style>
