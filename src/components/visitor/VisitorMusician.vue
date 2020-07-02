<template>
    <section>
        <Navigation :userType="userType"></Navigation>
        <v-main>
            <MusicianProfile v-if="musician !== null" :account="musician"
                             :inOtherMusicianProfile="true"></MusicianProfile>
        </v-main>
    </section>
</template>

<script>
    import Navigation from "../navigation/Navigation";
    import MusicianProfile from "../musician/MusicianProfile";
    import MusicianDataService from "../../services/MusicianDataService";

    export default {
        name: "VisitorMusician",
        components: {
            Navigation,
            MusicianProfile,
        },
        data: () => ({
            userType: '',
            musician: null
        }),
        methods: {
            getAccount() {
                MusicianDataService.get(this.$route.params.id)
                    .then(response => {
                        this.musician = response.data;
                    })
                    .catch(e => {
                            console.log(e);
                        }
                    );
            }
        },
        mounted() {
            this.userType = localStorage.getItem('userType');
            this.getAccount();
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
