<template>
    <div>
        <div style="text-align: center">
            <div>
                <v-card class="card" style="height: 450px">
                    <v-card-title>{{musician.firstName}} {{musician.lastName}}</v-card-title>
                    <v-img v-if="musician.photoUrl !== null" :src="musician.photoUrl"
                           alt="user photo"
                           height="200px"
                    ></v-img>
                    <v-card-subtitle class="pb-0">Descripcion</v-card-subtitle>
                    <v-card-text class="text--primary" align="left">
                        {{ musician.description }}
                    </v-card-text>
                    <v-card-subtitle align="left"> Age: {{ musician.age }}</v-card-subtitle>
                    <v-card-actions style="justify-content: center; ">
                        <v-btn v-if="!inOtherMusicianProfile" color="purple" outlined x-small bottom
                               @click="dialog1=true">Update
                            Description
                        </v-btn>
                        <v-btn v-if="userType === 'Organizer'" color="purple" text @click="openConfirmationDialog">
                            Contract
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card class="card" height="450">
                    <v-card-title class="mt-0 mb-0 py-0">Publications
                        <v-card-actions>
                            <v-btn v-if="!inOtherMusicianProfile" color="purple" text @click="dialog2=true">New</v-btn>
                        </v-card-actions>
                    </v-card-title>
                    <v-virtual-scroll
                            :bench="benched"
                            :items="publications"
                            height="400"
                            item-height="200"
                    >
                        <template v-slot="{ item }">
                            <MusicianPublicationForProfile :inOtherMusicianProfile="inOtherMusicianProfile" :item="item"></MusicianPublicationForProfile>
                            <v-divider></v-divider>
                        </template>

                    </v-virtual-scroll>


                </v-card>
            </div>
            <div>
                <v-card class="card">
                    <v-sheet class="mx-auto mb-n3 pb-0" max-width=260>
                        <div style="display: flex" class="align-center justify-center">
                            <v-btn icon @click="subtitle='Genres'">
                                <v-icon>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            <v-card-text class="mx-1 text--black"
                                         style="font-size: 18px; width: 120px;">{{ subtitle }}
                            </v-card-text>
                            <v-btn icon @click="subtitle='Instruments'">
                                <v-icon>
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>
                        </div>
                    </v-sheet>
                    <v-card-text class="text--primary px-0 pt-0 pb-0" align="left">
                        <div v-if="subtitle === 'Genres'">
                            <v-list v-for="genre in genres" :key="genre.id">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-music-note</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title class="ml-n8">{{ genre.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            <v-card-actions style="justify-content: center">
                                <v-btn v-if="!inOtherMusicianProfile"
                                       color="purple"
                                       outlined
                                       x-small
                                       @click="dialog3=true">Add new genre
                                </v-btn>
                            </v-card-actions>
                        </div>

                        <div v-else-if="subtitle === 'Instruments'">
                            <v-list v-for="instrument in instruments" :key="instrument.id">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-music</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title class="ml-n8">{{ instrument.name }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            <v-card-actions style="justify-content: center">
                                <v-btn v-if="!inOtherMusicianProfile"
                                       color="purple"
                                       outlined
                                       x-small
                                       @click="dialog4=true">Add new instrument
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </v-card-text>

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
                                <v-btn v-if="!inOtherMusicianProfile && contact.icon === 'mdi-phone' " icon
                                       @click="dialog5=true">
                                    <v-icon>
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </div>
        </div>
        <v-snackbar v-model="snackbar">
            {{ snackbartext }}
            <template v-slot:action="{ attrs }">
                <v-btn color="purple" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <ContractCreationDialog :dataToContractCreation="dataToContractCreation" :dialog="dialog"
                                @dialog-changed="setDialog"
                                @contract-created="snackbar = true"></ContractCreationDialog>
        <UpdateGenresForm
                v-on:close-dialog="dialog3=false"
                :dialog="dialog3"
                :user-id="musician.userId"
                :genres="allGenres"></UpdateGenresForm>
        <UpdateInstrumentsForm
                v-on:close-dialog="dialog4=false"
                :dialog="dialog4"
                :user-id="musician.userId"
                :instruments="allInstruments"></UpdateInstrumentsForm>

        <UpdateDescriptionForm :dialog="dialog1"
                               v-on:close-success-description-dialog="updateDescription"
                               v-on:close-description-dialog="dialog1=false"></UpdateDescriptionForm>
        <NewPublicationForm :dialog="dialog2"
                            :user-id="musician.userId"
                            v-on:close-dialog="dialog2=false"></NewPublicationForm>
        <UpdatePhoneForm :dialog="dialog5"
                         v-on:close-success-phone-dialog="updatePhone"
                         v-on:close-phone-dialog="dialog5=false"></UpdatePhoneForm>
    </div>
</template>

<script>
    import MusicianDataService from "@/services/MusicianDataService";
    import ContractCreationDialog from "../contracts/ContractCreationDialog";
    import PublicationDataService from "../../services/PublicationDataService";
    import UpdateDescriptionForm from "../forms/UpdateDescriptionForm";
    import UpdateGenresForm from "../forms/UpdateGenresForm";
    import NewPublicationForm from "../forms/NewPublicationForm";
    import GenreDataService from "../../services/GenreDataService";
    import UpdateInstrumentsForm from "../forms/UpdateInstrumentsForm";
    import InstrumentDataService from "../../services/InstrumentDataService";
    import UpdatePhoneForm from "../forms/UpdatePhoneForm";
    import MusicianPublicationForProfile from "./MusicianPublicationForProfile";

    export default {
        name: "MusicianProfile",
        components: {
            MusicianPublicationForProfile,
            ContractCreationDialog,
            UpdateDescriptionForm,
            UpdateGenresForm,
            NewPublicationForm,
            UpdateInstrumentsForm,
            UpdatePhoneForm
        },
        data: () => ({
            //errors: [],
            userType: localStorage.getItem('userType'),
            musician: {},
            dialog: false,
            dataToContractCreation: {},
            snackbar: false,
            snackbartext: 'Contract send successfully',
            publications: [],
            benched: 0,
            genres: [],
            instruments: [],
            subtitle: 'Genres',
            dialog1: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            dialog5: false,
            allGenres: [],
            allInstruments: [],
            contacts: [],
            viewCommentDialog: false,
        }),
        props: {
            account: null,
            allowContract: {
                type: Boolean,
                default: false
            },
            inOtherMusicianProfile: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            retrieveMusician() {
                let id = localStorage.getItem('id');
                MusicianDataService.get(id)
                    .then(response => {
                        this.musician = response.data;
                        this.retrievePublications();
                        this.retrieveGenres();
                        this.retrieveInstruments();
                        this.retrieveContacts();
                    })
                    .catch(e => {
                        this.errors.push(e);
                    });

            },
            setDialog(newValue) {
                this.dialog = newValue;
            },
            openConfirmationDialog() {
                this.dialog = true;
            },

            retrievePublications() {

                let id = this.musician.userId;

                PublicationDataService.getByMusicianId(id)
                    .then(response => {
                        this.publications = response.data;
                        //console.log(this.publications);
                    })
                    .catch(e => {
                        console.log(e);
                    });


            },
            retrieveGenres() {
                //console.log('here');
                MusicianDataService.getMusicianGenres(this.musician.userId)
                    .then(response => {
                        this.genres = response.data;
                        this.retrieveAllGenres();
                    })
                    .catch(e => {
                        console.log(e);
                    });

            },
            retrieveInstruments() {
                MusicianDataService.getMusicianInstruments(this.musician.userId)
                    .then(response => {
                        this.instruments = response.data;
                        this.retrieveAllInstruments();
                    })
                    .catch(e => {
                        console.log(e);
                    });

            },
            updateDescription(data) {
                const updateMusician = {
                    firstName: this.musician.firstName,
                    lastName: this.musician.lastName,
                    phone: this.musician.phone,
                    personalWeb: this.musician.personalWeb,
                    accountType: this.musician.accountType,
                    districtId: 1,
                    photoUrl: this.musician.photoUrl,
                    description: data,
                    rating: 0
                }
                MusicianDataService.put(this.musician.userId, updateMusician)
                    .then(() => {})
                    .catch(e => {
                        console.log(e);
                    })
            },
            retrieveAllGenres() {
                GenreDataService.getAll()
                    .then(response => {
                        let resources = response.data;
                        resources.forEach(resource => {
                            if (this.genres.find(val => val.name !== resource.name)) {
                                this.allGenres.push(resource);
                            }
                        })
                    })
                    .catch(e => {
                        console.log(e);
                    })


            },
            retrieveAllInstruments() {
                InstrumentDataService.getAll()
                    .then(response => {
                        let resources = response.data;
                        resources.forEach(resource => {
                            if (this.instruments.find(val => val.name !== resource.name)) {
                                this.allInstruments.push(resource);
                            }
                        })
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            retrieveContacts() {
                this.contacts = [
                    {name: this.musician.email, icon: 'mdi-email-outline'},
                    {name: this.musician.phone, icon: 'mdi-phone'},
                    {name: this.musician.district, icon: 'mdi-map-marker'}
                ];
            },
            updatePhone(data) {
                const updateMusician = {
                    firstName: this.musician.firstName,
                    lastName: this.musician.lastName,
                    phone: data,
                    personalWeb: this.musician.personalWeb,
                    accountType: this.musician.accountType,
                    districtId: 1,
                    photoUrl: this.musician.photoUrl,
                    description: this.musician.description,
                    rating: 0
                }
                MusicianDataService.put(this.musician.userId, updateMusician)
                    .then(response => {
                        console.log(response.message);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }


        },
        mounted() {
            if (this.account === null) {
                this.retrieveMusician();
            } else {
                this.musician = this.account;
                this.retrievePublications();
                this.retrieveGenres();
                this.retrieveInstruments();
                this.retrieveContacts();

            }


            this.dataToContractCreation = {
                organizerId: +localStorage.getItem('id'),
                musicianId: this.musician.userId
            };


            //console.log(this.musician)
            //console.log(this.inOtherMusicianProfile);
        }
    }
</script>

<style scoped>
    .card {
        width: 300px;
        display: inline-block;
        margin: 4px 4px 4px;
        vertical-align: top;
    }
</style>
