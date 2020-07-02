<template>
    <v-dialog v-model="dialogFlag" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Contract Qualification</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" align="center">
                            <v-rating v-model="rating" background-color="purple lighten-2" color="purple"
                                      large></v-rating>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea solo label="Comment" v-model="text"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="purple darken-2" text @click="dialogFlag = false">Close</v-btn>
                <v-btn color="purple darken-2" text @click="qualify">Rate</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import ContractDataService from "../../services/ContractDataService";

    export default {
        name: "ContractQualificationDialog",
        props: {
            dialog: Boolean,
            data: Object
        },
        methods: {
            qualify() {
                console.log(this.data);

                ContractDataService.qualify(this.data.organizerId, this.data.contractId, this.data.musicianId, {
                    score: this.rating,
                    text: this.text
                }).then(() => {
                    console.log('qualified successfully');
                    ContractDataService.putContractState(this.data.contractId, 1).then(() => {
                        window.location.reload();
                        this.rating = 0;
                        this.text = '';
                        this.$emit('dialog-changed');
                    }, error => {
                        console.log(error);
                    });
                }, error => {
                    console.log(error);
                });
            }
        },
        data: () => ({
            rating: 0,
            text: ''
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
