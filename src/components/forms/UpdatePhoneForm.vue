<template>
    <div>
        <v-dialog
                v-model="dialog"
                max-width="500px"
                transition="dialog-bottom-transition"
                persistent

        >
            <v-card>
                <v-card-title class="headline">Update your phone</v-card-title>
                <v-sheet class="ml-5 mr-5"
                         style="width: 300px">
                    <v-text-field v-model="phone"
                                label="Insert a new phone"

                    >
                    </v-text-field>
                </v-sheet>


                <v-card-actions class="ml-5">
                    <v-btn
                            color="purple darken-1"
                            outlined
                            @click="$emit('close-success-phone-dialog', phone)"
                    >
                        Update
                    </v-btn>
                    <v-btn
                            color="purple darken-1"
                            text
                            @click="$emit('close-phone-dialog')"
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
        name: "UpdatePhone",
        props: {
            dialog: Boolean
        },
        data: () => ({
            phone: ''
        }),
        methods: {},
        created() {

        }
    }
</script>

<style scoped>

</style>