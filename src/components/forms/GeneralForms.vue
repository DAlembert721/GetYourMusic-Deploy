<template>
    <div>
        <v-container >
            <v-tabs v-model="tab" centered color="purple">
                <v-tab>LogIn</v-tab>
                <v-tab>Registrate</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <LoginForm ></LoginForm>

                </v-tab-item>
                <v-tab-item>
                    <RegistrationForm></RegistrationForm>
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </div>
</template>

<script>
    import LoginForm from "./LoginForm";
    import RegistrationForm from "./RegistrationForm";

    export default {
        name: "GeneralForms",
        components: {
            LoginForm,
            RegistrationForm,
        },
        props:{
            drawer: Boolean,
        },
        data: () => ({
            tab: null,

        }),
        methods : {

        },
    }
</script>

<style scoped>

</style>