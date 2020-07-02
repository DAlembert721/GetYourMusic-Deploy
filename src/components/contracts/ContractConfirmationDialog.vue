<template>
    <v-dialog v-model="dialogFlag" max-width="300px">
        <v-card>
            <v-card-title class="headline d-flex justify-center">Confirmation dialog</v-card-title>
            <v-card-text class="my-5 text-center">{{ text }}</v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn outlined @click="confirmSelected" class="mx-10">Yes</v-btn>
                <v-btn outlined @click="declineSelected" class="mx-10">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "ContractConfirmationDialog",
        props: {
            text: String,
            dialog: Boolean
        },
        methods: {
            confirmSelected() {
                this.dialogFlag = false;
                this.$emit('confirmed');
            },
            declineSelected() {
                this.dialogFlag = false;
                this.$emit('declined');
            }
        },
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
