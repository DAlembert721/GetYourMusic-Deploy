<template>
    <div class="full-height d-flex flex-column justify-center">
        <v-card
                class="mx-md-auto margenespecial ma-5"
                min-width="30%"
                elevation="11"
                flat
                outlined
                tile>
            <v-card-title class="justify-center title1">LogIn</v-card-title>
            <v-card-text>
                <v-form v-model="isValid">
                    <v-text-field
                            label="Correo electrónico"
                            v-model="email"
                            :rules="emailRules"
                            class="app-text-field"
                            error-count="1"
                            color="purple"
                            required></v-text-field>

                    <v-text-field
                            label="Contraseña"
                            v-model="password"
                            :rules="passwordRules"
                            type="password"
                            error-count="1"
                            color="purple"
                            required></v-text-field>

                </v-form>
            </v-card-text>
            <v-card-actions class="justify-md-center">
                <v-btn @click.prevent="handleLogin" color="purple darken-2" :disabled="!isValid" class="white--text">Login
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>

</template>

<script>

    export default {
        name: "LoginForm",
        data: () => ({
            email: null,
            password: null,
            isValid: true,
            emailRules: [v => !!v || 'Email is required'],
            passwordRules: [v => !!v || 'Password is required'],
            userType: null,
            token: "",
            //errors: [],
        }),
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        created() {
            if (this.loggedIn) {
                this.$router.push('/home');
            }
        },
        methods: {
            handleLogin() {
                const user = {
                    email: this.email,
                    password: this.password
                };


                if (user.email && user.password) {
                    this.$store.dispatch('auth/login', user)
                        .then(
                            () => {
                                this.logComplete();
                            }
                        )
                        .catch(e => {
                            console.log(e);
                        })
                }


            },
            logComplete() {
                this.$router.push({name: 'home'});
            }
        },
        mounted() {
            this.$vuetify.theme.themes.light.error = '#C62828';
        }

    }


</script>

<style scoped>
    .margenespecial {
        margin-top: 15%;
    }

    .title1 {
        color: purple;
    }

    .full-height {
        height: 100%;
    }


</style>
