<template>
    <v-table-overflow v-model="drawer">
        <v-card>
            <v-card-title>
                <v-toolbar flat>
                    <v-toolbar-title>Musicians</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-spacer>
                        <v-text-field
                                v-model="search"
                                label="Search"
                                single-line
                                hide-details
                                align-end
                        ></v-text-field>
                    </v-spacer>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </v-card-title>
            <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="musicians"
                    :search="search"
                    single-expand
                    item-key="firstName"
                    show-expand
                    class="elevation-1"
                    @item-expanded="setSelectedItem"
            >
                <thead></thead>
                <template v-slot:items="props">
                    <td>{{ props.item.firstName }}</td>
                    <td class="text-xs-right">{{ props.item.lastName }}</td>
                    <td class="text-xs-right">{{ props.item.rating }}</td>
                    <td class="text-xs-right">{{ props.item.phone }}</td>
                    <td class="text-xs-right">{{ props.item.age }}</td>
                    <td class="text-xs-right">{{ props.item.personalWeb }}</td>
                    <td class="text-xs-right">{{ props.item.district }}</td>
                </template>
                <template v-slot:expanded-item="{ headers }">
                    <td :colspan="headers.length" align="center">
                        <v-btn small left outlined color="purple lighten-2" @click="goToProfile">View Profile</v-btn>
                        <v-btn small center outlined color="purple lighten-2" @click="goToMessage">Send Message</v-btn>

                    </td>
                </template>
            </v-data-table>
        </v-card>
    </v-table-overflow>
</template>

<script>
    import MusicianDataService from "../../services/MusicianDataService";

    export default {
        name: "Table",
        props: {
            drawer: Boolean
        },
        data() {
            return {
                expanded: [],
                selected: [],
                selectedItem: Object,
                singleExpand: false,
                search: '',
                headers: [
                    {
                        text: 'FirstName',
                        align: 'start',
                        filterable: true,
                        value: 'firstName',
                    },
                    {text: 'LastName', value: 'lastName'},
                    {text: 'Rating', value: 'rating'},
                    {text: 'Phone', value: 'phone'},
                    {text: 'Age', value: 'age'},
                    {text: 'Web', value: 'personalWeb'},
                    {text: 'District', value: 'district'}
                ],
                musicians: [],
            }
        },
        mounted() {
            this.retrieveMusicians();
        },
        methods: {
            retrieveMusicians() {
                MusicianDataService.getAll()
                    .then(response => {
                        this.musicians = response.data;
                    })
                    .catch(e => {
                        this.errors.push(e);
                    });
            },
            setSelectedItem(selectedItem)
            {
              this.selectedItem=selectedItem.item;
            },
            goToProfile() {
                this.$router.push({name: 'visitor', params: {id: this.selectedItem.userId}});
            },
            goToMessage() {
                this.$router.push({name: 'messages'});
            }
        }
    }
</script>

<style scoped>

</style>
