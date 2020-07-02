<template>
    <div class="d-flex justify-center">
        <v-card class="ma-5 pa-5 our-card" style="width: 750px">
            <v-card-title class="d-flex justify-space-between">
                <div v-if="userType === 'Organizer'">
                    <h4 class="mx-3 black--text font-weight-light">Contract to: {{ contract.musician.firstName }}</h4>
                </div>
                <div v-else>
                    <h4 class="mx-3 black--text font-weight-light">Contract from: {{ contract.organizer.firstName
                        }}</h4>
                </div>
                <h4 class="mx-3 black--text font-weight-light">Date: {{ formatCompat(contract.startDate) }}</h4>
                <h4 class="mx-3 black--text font-weight-light">Address: {{ contract.address }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class="mt-5">
                    <h2 class="black--text font-weight-regular">Address:</h2>
                    <p class="mt-5 grey--text font-weight-regular">{{ contract.address }}</p>
                </div>
                <div class="mt-5">
                    <h2 class="black--text font-weight-regular">Reference:</h2>
                    <p class="mt-5 grey--text font-weight-regular">{{ contract.reference }}</p>
                </div>
            </v-card-text>
            <v-card-text class="d-flex justify-end">
                <h3 class="black--text font-weight-regular"
                    v-if="contract.state === 'Respuesta pendiente'">
                    State: Without answer
                </h3>
                <h3 class="black--text font-weight-regular"
                    v-else-if="contract.state === 'Trabajo pendiente'">
                    State: With pending work
                </h3>
                <h3 class="black--text font-weight-regular"
                    v-else-if="contract.state === 'Finalizado'">
                    State: Finished
                </h3>
                <h3 class="black--text font-weight-regular"
                    v-else>
                    State: Rejected work
                </h3>
            </v-card-text>
            <!--            <v-card-actions class="d-flex justify-end"-->
            <!--                            v-if="userType === 'Organizer' && contract.state === 'Respuesta pendiente'">-->
            <!--                <v-btn class="ma-2" @click="openConfirmationDialog('delete')"-->
            <!--                       outlined color="red">Delete-->
            <!--                </v-btn>-->
            <!--            </v-card-actions>-->
            <v-card-actions class="d-flex justify-end"
                            v-if="userType === 'Organizer' && contract.state === 'Trabajo pendiente'">
                <v-btn class="ma-2" @click="openQualificationDialog"
                       outlined color="purple darken-2">Finish
                </v-btn>
            </v-card-actions>
            <v-card-actions class="d-flex justify-space-between"
                            v-if="userType === 'Musician' && contract.state === 'Respuesta pendiente'">
                <v-btn class="ma-2" @click="openConfirmationDialog('accept')"
                       outlined color="purple darken-2">Accept
                </v-btn>
                <v-btn class="ma-2" @click="openConfirmationDialog('dismiss')"
                       outlined color="red">Dismiss
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="snackbar">
            {{ snackbartext }}
            <template v-slot:action="{ attrs }">
                <v-btn color="purple" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <ContractConfirmationDialog :dialog="dialog"
                                    :text="text"
                                    @dialog-changed="setDialog"
                                    @confirmed="dialogConfirmed"
                                    @declined="dialogDeclined"></ContractConfirmationDialog>
        <ContractQualificationDialog :dialog="qualificationDialog"
                                     :data="dataForQualification"
                                     @dialog-changed="setQualificationDialog"></ContractQualificationDialog>
    </div>
</template>

<script>
    import ContractConfirmationDialog from "./ContractConfirmationDialog";
    import ContractDataService from "../../services/ContractDataService";
    import ContractQualificationDialog from "./ContractQualificationDialog";

    export default {
        name: "Contract",
        components: {ContractQualificationDialog, ContractConfirmationDialog},
        props: {
            contract: Object,
            whitActions: {
                default: true,
                type: Boolean
            }
        },
        data: () => ({
            userType: localStorage.getItem('userType'),
            dialog: false,
            qualificationDialog: false,
            text: '',
            action: '',
            dataForQualification: {
                organizerId: null,
                contractId: null,
                musicianId: null
            },
            snackbar: false,
            snackbartext: '',
        }),
        methods: {
            formatCompat(date) {
                const dateType = new Date(date);
                const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return dateType.getDate() + ' ' + ms[dateType.getMonth()] + ' ' + dateType.getFullYear();
            },
            setDialog(newValue) {
                this.dialog = newValue;
            },
            setQualificationDialog(newValue) {
                this.qualificationDialog = newValue;
            },
            dialogConfirmed() {
                console.log('confirmed');

                let toState = undefined;

                switch (this.action) {
                    case 'accept':
                        this.snackbartext = 'You have accepted the contract'
                        toState = 3;
                        break;
                    case 'dismiss':
                        this.snackbartext = 'You have rejected the contract'
                        toState = 4;
                        break;
                }

                this.snackbar = true;

                ContractDataService.putContractState(this.contract.id, toState).then(() => {
                    window.location.reload();
                }, error => {
                    console.log(error);
                });

                // TODO: delete contract action for organizers

                this.action = '';
                this.text = '';
            },
            dialogDeclined() {
                this.action = '';
                this.text = '';
            },
            openConfirmationDialog(type) {
                this.action = type;

                this.text = 'Do you want to ' + this.action + ' the contract?';
                this.dialog = true;
            },
            openQualificationDialog() {
                this.dataForQualification.contractId = this.contract.id;
                this.dataForQualification.organizerId = +localStorage.getItem('id');
                this.dataForQualification.musicianId = this.contract.musician.userId;

                this.qualificationDialog = true;
                console.log('qualification dialog');
            }
        }
    }
</script>

<style scoped>
    .our-card {
        border-radius: 20px;
    }
</style>
