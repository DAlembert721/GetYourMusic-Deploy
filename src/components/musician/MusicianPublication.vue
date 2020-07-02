<template>
    <v-col
            class="d-flex child-flex"
            cols="6"
    >
        <v-card
                class="ml-5"
                max-width="400"
                rounded>
            <v-card-title
                    class="align-center"
                    @click="goToMusicianProfile(publication.musicianId)">
                {{ publication.musicianName }}
            </v-card-title>
            <iframe
                    width="400"
                    height="200"
                    v-bind:src="publication.mediaUrl"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
            </iframe>
            <v-card-subtitle> {{ publication.content }}</v-card-subtitle>
            <v-card-actions class="d-flex justify-center">
                <v-btn outlined text color="purple darken-2"
                       @click="viewCommentDialog = true">View comment
                </v-btn>
            </v-card-actions>
            <PublicationComment :dialog="viewCommentDialog" :publicationId="publication.id"
                                @dialog-changed="setDialog"></PublicationComment>
        </v-card>
    </v-col>
</template>

<script>
    import PublicationComment from "./PublicationComment";

    export default {
        name: "MusicianPublication",
        components: {PublicationComment},
        props: {
            publication: Object
        },
        data: () => ({
            viewCommentDialog: false,
        }),
        methods: {
            setDialog(value) {
                this.viewCommentDialog = value;
            }
        }
    }
</script>

<style scoped>

</style>
