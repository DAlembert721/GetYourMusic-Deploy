<template>
    <v-dialog v-model="dialogFlag" max-width="500px" transition="dialog-bottom-transition" persistent>
        <v-card>
            <v-card-title class="headline">Update your profile photo</v-card-title>
            <v-sheet class="ml-5 mr-5"
                     style="width: 300px">
                <v-text-field v-model="photoUrl" label="Insert a new photo">
                </v-text-field>
            </v-sheet>


            <v-card-actions class="ml-5">
                <v-btn color="purple darken-1" outlined
                       @click="$emit('close-success-photo-dialog', photoUrl)">
                    Update
                </v-btn>
                <v-btn
                        color="purple darken-1"
                        text
                        @click="$emit('close-photo-dialog')">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "UpdatePhotoForm",
        props: {
            dialog: Boolean
        },
        data: () => ({
           photoUrl: ''
        }),
        computed: {
            dialogFlag: {
                get: function () {
                    return this.dialog;
                },
                set: function (newValue) {
                    this.$emit('dialog-changed', newValue);
                }
            }
        }
    }
</script>

<style scoped>

</style>
