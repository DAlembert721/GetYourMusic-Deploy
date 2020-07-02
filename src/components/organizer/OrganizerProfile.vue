<template>
    <div class="div">
        <v-card max-width="344" class="card">
            <v-list-item>
                <v-list-item-content>
                    <div class="d-flex align-center">
                        <v-list-item-title class="headline">{{organizer.firstName}} {{organizer.lastName}}
                        </v-list-item-title>
                        <v-btn color="purple" outlined x-small bottom
                               @click="openUpdatePhotoDialog">
                            Update photo
                        </v-btn>
                    </div>
                    <v-list-item-subtitle>{{organizer.accountType}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-img v-if="organizer.photoUrl !== null" :src="organizer.photoUrl"
                   alt="user photo"
                   height="200px">
            </v-img>
        </v-card>
        <v-card class="card">
            <v-card-title>Contacto</v-card-title>
            <v-card-text class="text--primary pb-0" align="left">
                <v-list v-for="contact in contacts" :key="contact.id" class="pa-0">
                    <v-list-item class="ma-0 mt-0" style="padding-top: 0; padding-bottom: 0">
                        <v-list-item-icon>
                            <v-icon>{{ contact.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="ml-n5">{{ contact.name }}</v-list-item-title>
                        <v-btn v-if="contact.icon === 'mdi-phone' " icon
                               @click="dialog5=true">
                            <v-icon>
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <UpdatePhoneForm :dialog="dialog5"
                         v-on:close-success-phone-dialog="updatePhone"
                         v-on:close-phone-dialog="dialog5=false"></UpdatePhoneForm>
        <UpdatePhotoForm :dialog="updatePhotoDialog" @close-photo-dialog="updatePhotoDialog = false"
                         @close-success-photo-dialog="updatePhoto"></UpdatePhotoForm>
    </div>
</template>

<script>
    import OrganizerDataService from "../../services/OrganizerDataService";
    import UpdatePhotoForm from "../forms/UpdatePhotoForm";
    import UpdatePhoneForm from "../forms/UpdatePhoneForm";

    export default {
        name: "OrganizerProfile",
        components: {UpdatePhotoForm, UpdatePhoneForm},
        data() {
            return {
                organizer: {},
                contacts: [],
                updatePhotoDialog: false,
                dialog5: false,
            }
        },
        mounted() {
            this.getOrganizer(+localStorage.getItem('id'));
        },
        methods: {
            updatePhoto(data) {
                const updateOrganizer = {
                    phone: this.organizer.phone,
                    photoUrl: data
                };

                OrganizerDataService.updateOrganizer(this.organizer.userId, updateOrganizer)
                    .then(() => {
                        window.location.reload()
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            updatePhone(data) {
                const updateOrganizer = {
                    phone: data,
                    photoUrl: this.organizer.photoUrl
                };

                OrganizerDataService.updateOrganizer(this.organizer.userId, updateOrganizer)
                    .then(() => {
                        window.location.reload()
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            openUpdatePhotoDialog() {
                this.updatePhotoDialog = true;
            },
            getOrganizer(id) {
                OrganizerDataService.get(id)
                    .then(response => {
                        this.organizer = response.data;
                        this.retrieveContacts();

                        this.contacts = [
                            {name: this.organizer.email, icon: 'mdi-email-outline'},
                            {name: this.organizer.phone, icon: 'mdi-phone'},
                            {name: this.organizer.district, icon: 'mdi-map-marker'}
                        ];
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            retrieveContacts() {
                this.contacts = [
                    {name: this.organizer.email, icon: 'mdi-email-outline'},
                    {name: this.organizer.phone, icon: 'mdi-phone'},
                    {name: this.organizer.district, icon: 'mdi-map-marker'}
                ];
            }
        }
    }
</script>

<style scoped>
    .div {
        padding-top: 50px;
        text-align: center;
    }

    .card {
        width: 300px;
        height: 400px;
        display: inline-block;
        margin: 4px 4px 4px;
        vertical-align: top;
    }

    section {
        height: 100%;
        width: 100%;
        color: #ffff;
        background: linear-gradient(45deg, #c074b2, #8ab5e8);
        margin: 0;
        overflow-y: scroll;
        position: absolute;
        display: inline-table;
        background-attachment: fixed;
    }
</style>
