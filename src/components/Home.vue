<template>

    <div>

        <OrganizerHome v-if="userType === 'Organizer'"></OrganizerHome>
        <MusicianHome v-if="userType === 'Musician'"></MusicianHome>

    </div>

</template>

<script>
    //import Navigation from "@/components/navigation/Navigation";
    import MusicianHome from "@/components/musician/MusicianHome";
    import OrganizerHome from "@/components/organizer/OrganizerHome";

    //import UserDataService from "../services/UserDataService";
    export default {
        name: "Home",
        components:{
            OrganizerHome,
            MusicianHome,
            //Navigation,
        },
        data: () => ({
            userType: '',
        }),
        mounted() {
           this.userType = localStorage.getItem('userType');

        },
        created() {
            if (!localStorage.getItem('token')) {
                this.$router.push('/login');
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
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
