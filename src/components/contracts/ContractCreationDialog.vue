<template>
    <v-dialog v-model="dialogFlag" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">User Profile</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field color="purple" label="Name" v-model="model.name" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field color="purple" label="Payment Amount" v-model="model.paymentAmount"
                                          required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field color="purple" label="Address" v-model="model.address"
                                          required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field color="purple" label="Reference" v-model="model.reference"
                                          required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            required
                                            v-model="model.startDate"
                                            label="Start date"
                                            prepend-icon="mdi-calendar"
                                            color="purple"
                                            readonly
                                            v-on="on"
                                            v-bind="attrs"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        ref="picker"
                                        v-model="model.startDate"
                                        :max="new Date().toISOString().substr(0, 10)"
                                        min="1950-01-01"
                                        @change="save"
                                        color="purple"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12">
                            <v-menu
                                    ref="menuEndDate"
                                    v-model="menuEndDate"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                            required
                                            v-model="model.endDate"
                                            label="End Date"
                                            prepend-icon="mdi-calendar"
                                            color="purple"
                                            readonly
                                            v-on="on"
                                            v-bind="attrs"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        ref="$refsEndDate"
                                        v-model="model.endDate"
                                        :max="new Date().toISOString().substr(0, 10)"
                                        min="1950-01-01"
                                        @change="saveEndDate"
                                        color="purple"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="dialogFlag = false">Close</v-btn>
                <v-btn color="blue darken-1" @click="sendContract">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import ContractDataService from "../../services/ContractDataService";

    export default {
        name: "ContractCreationDialog",
        props: {
            dataToContractCreation: Object,
            dialog: Boolean
        },
        data: () => ({
            model: {
                name: '',
                paymentAmount: null,
                address: '',
                reference: '',
                startDate: null,
                endDate: null
            },
            menu: false,
            menuEndDate: false,
        }),
        methods: {
            sendContract() {
                this.model.paymentAmount = +this.model.paymentAmount;

                console.log(this.model);

                ContractDataService.createContract(this.dataToContractCreation.organizerId,
                    this.dataToContractCreation.musicianId,
                    this.model).then(() => {
                        this.model = {
                            name: '',
                            paymentAmount: null,
                            address: '',
                            reference: '',
                            startDate: null,
                            endDate: null
                        };
                        this.$emit('dialog-changed')
                    this.$emit('contract-created');
                    console.log("contract created");
                }, error => {
                    console.log(error);
                });
            },
            save(date) {
                this.$refs.menu.save(date)
            },
            saveEndDate(date) {
                this.$refs.menuEndDate.save(date)
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
