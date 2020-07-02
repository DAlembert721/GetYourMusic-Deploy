<template>
    <div>
        <v-dialog
                v-model="dialog"
                max-width="500px"
                transition="dialog-bottom-transition"
                persistent

        >
            <v-card>
                <v-card-title class="headline">Create a mew publications</v-card-title>
                <v-sheet class="ml-5 mr-5"
                         style="width: 300px">
                    <v-text-field v-model="publication.content"
                                  label="Content"
                    >
                    </v-text-field>
                    <v-textarea v-model="publication.mediaUrl"
                                label="Insert the media link">
                    </v-textarea>
                    <v-combobox
                            v-model="select"
                            :items="types"
                            item-text="publicationType">

                    </v-combobox>
                </v-sheet>


                <v-card-actions class="ml-5">
                    <v-btn
                            color="purple darken-1"
                            outlined
                            @click="createPublication"
                    >
                        Publish
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

    import PublicationDataService from "../../services/PublicationDataService";

    export default {
        name: "NewPublicationForm",
        props: {
            dialog: Boolean,
            userId: null
        },
        data: () => ({
            publication: {
                content: 'Hi',
                mediaUrl: '',
                publicationType: ''
            },
            types: [
                {publicationType: 'video'},
                {publicationType: 'photo'}
            ],
            select: null
        }),
        methods: {
            createPublication() {
                this.publication.publicationType = this.select.publicationType;
                console.log(this.publication);
                PublicationDataService.create(this.userId, this.publication)
                .then(response => {
                   console.log(response.data);
                   console.log('The publication was created')
                })
                .catch(e => {
                    console.log(e);
                });
                this.$emit('close-dialog');
            }
        }
    }
</script>

<style scoped>

</style>