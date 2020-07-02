<template>
    <section>
        <Navigation :userType="userType"></Navigation>
        <v-main>
            <OrganizerProfile v-if="userType === 'Organizer'" ></OrganizerProfile>
            <MusicianProfile :allowContract="true" v-if="userType === 'Musician'" :account="null"></MusicianProfile>
        </v-main>
    </section>
</template>

<script>
    import OrganizerProfile from "./organizer/OrganizerProfile";
    import MusicianProfile from "./musician/MusicianProfile";
    import Navigation from "./navigation/Navigation";

    export default {
        name: "Profile",
        components: {
            Navigation,
            MusicianProfile,
            OrganizerProfile
        },
        data: () => ({
            userType: ''
        }),
        mounted() {
            this.userType = localStorage.getItem('userType');
        }
    }
</script>

<style scoped>
    section{
        height: 100%;
        width: 100%;
        color: #ffff;
        background: linear-gradient(45deg, #c074b2, #8ab5e8) ;
        margin: 0;
        overflow-y: scroll;
        position: absolute;
        display: inline-table;
        background-attachment: fixed;
    }
</style>
