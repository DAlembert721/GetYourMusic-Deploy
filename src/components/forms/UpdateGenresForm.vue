<template>
    <div>
        <v-dialog
                v-model="dialog"
                max-width="500px"
                transition="dialog-bottom-transition"
                persistent
        >
            <v-card>
                <v-card-title class="headline">Select a genre</v-card-title>
                <v-sheet class="ml-5 mr-5"
                         style="width: 300px">
                    <v-combobox
                            v-model="genre"
                            :items="genres"
                            return-object
                            item-text="name">
                    </v-combobox>
                </v-sheet>
                <v-card-actions class="ml-5">
                    <v-btn
                            color="purple darken-1"
                            outlined
                            @click="addGenre"
                    >
                        Add Genre
                    </v-btn>
                    <v-btn
                            color="purple darken-1"
                            text
                            @click="$emit('close-dialog')"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import GenreDataService from "../../services/GenreDataService";

    export default {
        name: "UpdateGenresForm",
        props: {
            dialog: Boolean,
            userId: null,
            genres: Array,

        },
        data: () => ({

            genre: null,
        }),
        methods: {

            addGenre() {
                GenreDataService.assignGenreToMusician(this.userId, this.genre.id)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })

            }

        },
        mounted() {

        }

    }
</script>

<style scoped>

</style>