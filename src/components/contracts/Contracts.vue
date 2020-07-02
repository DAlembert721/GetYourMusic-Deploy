<template>
    <section>
        <Navigation :userType="userType"></Navigation>
        <v-main>
            <Contract v-for="contract in contracts" :key="contract.id"
                      :contract="contract"></Contract>
        </v-main>
    </section>
</template>

<script>
    import ContractDataService from "../../services/ContractDataService";
    import Navigation from "../navigation/Navigation";
    import Contract from "./Contract";

    export default {
        name: "Contracts",
        components: {Contract, Navigation},
        data: () => ({
            userType: '',
            contracts: Array
        }),
        mounted() {
            this.retrieveContracts();
        },
        created() {
            this.userType = localStorage.getItem('userType');
        },
        methods: {
            retrieveContracts() {
                if (this.userType === 'Musician') {
                    ContractDataService.getByMusicianId(+localStorage.getItem('id')).then(response => {
                        this.contracts = this.sort(response.data);
                    });
                }
                else {
                    ContractDataService.getByOrganizerId(+localStorage.getItem('id')).then(response => {
                        this.contracts = this.sort(response.data);
                    });
                }
            },
            sort(contracts) {
                return contracts.sort((a, b) => {
                    const aWeight = this.getWeight(a.state);
                    const bWeight = this.getWeight(b.state);

                    return aWeight - bWeight;
                });
            },
            getWeight(contractState) {
                let weight = undefined;

                switch (contractState) {
                    case 'Respuesta pendiente':
                        weight = 1;
                        break;
                    case 'Trabajo pendiente':
                        weight = 2;
                        break;
                    case 'Finalizado':
                        weight = 3;
                        break;
                    case 'Trabajo rechazado':
                        weight = 4;
                        break;
                }

                return weight;
            }
        }
    }
</script>

<style scoped>
    section{
        height: 100%;
        width: 100%;
        color: #ffff;
        background: linear-gradient(45deg, #c074b2, #8ab5e8) ;
        margin: 0;
        overflow-y: scroll;
        position: absolute;
        display: inline-table;
        background-attachment: fixed;
    }
</style>
