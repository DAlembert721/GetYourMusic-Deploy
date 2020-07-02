<template>
    <div>
        <v-dialog
                v-model="dialog"
                max-width="500px"
                transition="dialog-bottom-transition"
                persistent

        >
            <v-card>
                <v-card-title class="headline">Update your description</v-card-title>
                <v-sheet class="ml-5 mr-5"
                         style="width: 300px">
                    <v-textarea v-model="description"
                                  label="Insert a new description"

                    >

                    </v-textarea>
                </v-sheet>


                <v-card-actions class="ml-5">
                    <v-btn
                            color="purple darken-1"
                            outlined
                            @click="$emit('close-success-description-dialog', description)"
                    >
                        Update
                    </v-btn>
                    <v-btn
                            color="purple darken-1"
                            text
                            @click="$emit('close-description-dialog')"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    export default {
        name: "UpdateDescriptionForm",
        props: {
            dialog: Boolean
        },
        data: () => ({
            description: ''
        }),
        methods: {},
        created() {

        }
    }
</script>

<style scoped>

</style>