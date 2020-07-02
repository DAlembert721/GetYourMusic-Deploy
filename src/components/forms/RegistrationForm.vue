<template>
    <div class="full-height d-flex flex-column justify-center">
        <v-card
                class="mx-md-auto margenespecial ma-5"
                max-width="70%"
                elevation="11"
                flat
                outlined
                tile>
            <v-card-title class="justify-center title1">Registrate</v-card-title>

            <v-card-text>
                <v-form v-model="isValid">
                    <v-combobox
                            label="Escoge tipo de usuario"
                            v-model="userType"
                            :items="userTypeItems"
                            :rules="generalRules"
                            color="purple"
                    >
                    </v-combobox>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                    label="Nombre(s)"
                                    v-model="firstName"
                                    :rules="generalRules"
                                    color="purple"
                                    error-count="1"
                                    required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                    label="Apellido(s)"
                                    v-model="lastName"
                                    :rules="generalRules"
                                    color="purple"
                                    error-count="1"
                                    required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                    label="Correo electrónico"
                                    v-model="email"
                                    :rules="emailRules"
                                    color="purple"
                                    error-count="1"
                                    required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                    label="Contraseña"
                                    v-model="password"
                                    :rules="passwordRules"
                                    type="password"
                                    color="purple"
                                    error-count="4"
                                    required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
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
                                            v-model="birthDate"
                                            label="Fecha de cumpleaños"
                                            prepend-icon="mdi-calendar"
                                            color="purple"
                                            readonly
                                            v-on="on"
                                            v-bind="attrs"
                                            :rules="generalRules"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        ref="picker"
                                        v-model="birthDate"
                                        :max="new Date().toISOString().substr(0, 10)"
                                        min="1950-01-01"
                                        @change="save"
                                        color="purple"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                    label="Telefono"
                                    v-model="phone"
                                    color="purple"
                                    required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-select
                                    label="Region"
                                    v-model="region"
                                    :items="regions"
                                    item-text="name"
                                    item-value="id"
                                    color="purple"
                                    :rules="generalRules"
                                    @change="this.getCitiesItems"
                                    return-object
                            >
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-combobox
                                    label="Provincia"
                                    v-model="city"
                                    :items="cities"
                                    color="purple"
                                    :rules="generalRules"
                                    item-text="name"
                                    item-value="id"
                                    @change="getDistrictsItems"
                                    return-object
                            >
                            </v-combobox>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-combobox
                                    label="Distrito"
                                    v-model="district"
                                    :items="districts"
                                    color="purple"
                                    :rules="generalRules"
                                    item-text="name"
                                    return-object
                            >
                            </v-combobox>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions class="justify-md-center">
                <v-btn @click.prevent="handleRegister" color="purple darken-2" :disabled="!isValid" class="white--text">
                    Registrate
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import LocationDataService from "@/services/LocationDataService";


    export default {
        name: "Register",
        computed: {
          loggedIn() {
              return this.$store.state.auth.status.loggedIn;
          }
        },
        data: () => ({
            email: null,
            password: null,
            isValid: true,
            userType: null,
            firstName: null,
            lastName: null,
            birthDate: null,
            menu: false,
            phone: null,
            region: null,
            city: null,
            district: null,
            generalRules: [v => !!v || 'this space is required'],
            emailRules: [v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'Email must valid'],
            passwordRules: [v => !!v || 'Password is required',
                v => (v && v.length >= 5) || 'Password must have at least 5 characters',
                v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
                v => /([!@#$%}])/.test(v) || 'Must have one especial character [!@#$%}]'],
            userTypeItems: [
                'Organizer',
                'Musician',
            ],
            regions: [],
            cities: [],
            districts: [],
        }),
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },
        methods: {
            handleRegister() {
                const data = {
                    email: this.email,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phone: this.phone,
                    birthDate: this.birthDate,
                    accountType: this.userType,
                    districtId: this.district.id
                };
                if(data.email && data.password) {
                    this.$store.dispatch('auth/register', data)
                        .then(() => {
                            this.registerSuccess();
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }

            },
            registerSuccess() {
                window.location.reload();
                //this.$router.go(3);
            },
            getCitiesItems() {
                LocationDataService.getCities(this.region.id)
                    .then(response => {
                        this.cities =response.data;
                            console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });

            },
            getDistrictsItems() {
                LocationDataService.getDistricts(this.city.id)
                    .then(response => {
                        this.districts = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            save (date) {
                this.$refs.menu.save(date)
            },

            getRegionItems() {
                LocationDataService.getRegions()
                    .then(response => {
                        this.regions=response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

        },
        mounted() {
            this.getRegionItems();
            if (this.loggedIn) {
                this.$router.push('/home');
            }
        },



    }
</script>

<style scoped>
    .full-height {
        height: 100%;
    }

    .title1 {
        color: purple;
    }

    .margenespecial{
        max-width: 60%;
    }
    @media (max-width: 960px) {
        .margenespecial {
            margin-left: 15% !important;
            max-width: 70%;
        }
    }
</style>
