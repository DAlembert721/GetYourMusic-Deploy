<template>
    <v-card>
        <v-card style="background: linear-gradient(45deg, #c074b2, #8ab5e8) ;"
                class="mx-auto">
            <v-card-title
                    class="mx-auto">Musician
            </v-card-title>
            <v-card-text
                    class="mx-md-auto"
                    max-width="90%"
                    min-height="50%"
            >
                <v-card-title class="text--black">Siguiendo</v-card-title>
                <v-slide-group multiple show-arrows>
                    <v-slide-item
                            v-for="(followed,index) in followeds"
                            :key="index"
                            v-slot:default="{ active }"


                    >
                        <v-hover
                                v-slot:default="{ hover }"
                                close-delay="200">
                            <v-card
                                    :elevation="hover? 16 : 2"
                                    class="mx-auto ma-md-12 ml-n12"
                                    :input-value="active"
                                    active-class="purple white--text"
                                    depressed
                                    rounded
                                    @click="goToMusicianProfile(followed.userId)"
                                    max-width="10%"
                                    width="228px"


                            >
                                <v-img
                                        :src="followed.photoUrl"
                                        width="228px"
                                        aspect-ratio="1"
                                        contain
                                ></v-img>
                                <v-card-subtitle>{{ followed.firstName }} {{ followed.lastName}}</v-card-subtitle>
                            </v-card>
                        </v-hover>

                    </v-slide-item>
                </v-slide-group>
            </v-card-text>
            <v-card-text
                    class="mx-md-auto"
                    max-width="90%"
                    min-height="50%">

                <v-card-text
                        class="ml-5 mx-auto">
                    <v-row>
                        <v-col cols="16" md="8">
                            <v-text-field
                                    v-model="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                    align-end
                                    class="ml-5"
                                    append-icon="mdi-magnify"
                                    @change="updatePublications"
                            ></v-text-field>
                            <v-card-title class="text--black">Resultados de búsqueda</v-card-title>
                            <v-row>
                                <MusicianPublication
                                        v-for="(publication, index) in publications"
                                        :key="index"
                                        :publication="publication"></MusicianPublication>
                            </v-row>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col cols="8" md="3">
                            <v-card>
                                <v-card-title>Otros músicos recomendados</v-card-title>
                                <v-list
                                        v-for="(musician,index) in musicians"
                                        :key="index">
                                    <v-list-item @click="goToMusicianProfile(musician.userId)">
                                        <v-list-item-avatar>
                                            <v-img :src="musician.photoUrl"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-title>{{ musician.firstName }} {{ musician.lastName }}
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card-text>
        </v-card>

    </v-card>

</template>

<script>
    import FollowDataService from "@/services/FollowDataService"
    import PublicationDataService from "@/services/PublicationDataService";
    import MusicianDataService from "../../services/MusicianDataService";
    import MusicianPublication from "./MusicianPublication";

    export default {
        name: "MusicianHome",
        components: {MusicianPublication},
        data: () => ({
            api_key: '',
            followeds: [],
            publications: [],
            musicians: [],
            searchResults: [],
            //errors: [],
            search: '',
            viewCommentDialog: false,
        }),
        methods: {
            setDialog(value) {
                this.viewCommentDialog = value;
            },
            viewComment() {

            },
            retrieveFollowers() {
                FollowDataService.getAllBYFollowerId(localStorage.getItem('id'))
                    .then(response => {
                        this.followeds = response.data;
                        this.retrievePublications();
                        this.retrieveMusicians();
                    })
                    .catch(e => {
                        console.log(e);
                    });

            },
            retrievePublications() {
                this.followeds.forEach(followed => {
                        //console.log(followed);
                        PublicationDataService.getByMusicianId(followed.userId)
                            .then(response => {
                                const resources = response.data;
                                resources.forEach(resource => {
                                    if (resource.publicationType === 'video') {
                                        const publication = {
                                            id: resource.id,
                                            content: resource.content,
                                            mediaUrl: resource.mediaUrl,
                                            musicianName: followed.firstName + ' ' + followed.lastName,
                                            musicianId: followed.userId
                                        };
                                        this.publications.push(publication);
                                    }
                                });
                            })
                            .catch(e => {
                                console.log(e);
                            })
                    }
                );
            },
            retrieveMusicians() {
                this.musicians = [];
                MusicianDataService.getAll()
                    .then(response => {
                        let resources = response.data;
                        let me = localStorage.getItem('id');
                        resources.forEach(resource => {
                            if (!(this.followeds.find(followed => followed.userId === resource.userId) || +resource.userId === +me)) {
                                this.musicians.push(resource);
                            }
                        })
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            goToMusicianProfile(musicianId) {
                this.$router.push({name: 'visitor', params: {id: musicianId}});
            },
            updatePublications() {
                const list = [];
                this.publications.forEach(publication => {
                    if (this.search !== '') {
                        this.publications = [];
                        if (publication.musicianName.toLowerCase().includes(this.search.toLowerCase())) {
                            list.push(publication);
                        }
                        this.publications = list;
                    } else {
                        this.publications = [];
                        this.retrievePublications();
                        return {};
                    }
                })


            }


        },
        mounted() {
            this.retrieveFollowers();
            //this.retrievePublications();
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
