<template>
    <section>
        <Navigation :userType="userType"></Navigation>
        <v-main>
                <v-row>
                    <v-col cols="4">
                        <MessagesList v-on:watch-selected-message="watchSelectedMessage"
                                      v-on:new-message-form="watchNewMessageForm"></MessagesList>
                    </v-col>
                    <v-col cols="8">
                        <v-card max-width="80%">
                            <div v-if="message">
                                <v-card-title>
                                    <v-list three-line>
                                        <v-list-item-avatar color="purple">
                                            <span class="white--text">{{ message.sender.substr(0, 1) }}</span>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title v-text="message.sender"></v-list-item-title>
                                            <v-list-item-subtitle
                                                    v-text="formatCompat(message.sendDate)"></v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list>
                                </v-card-title>
                                <v-card-text>
                                    {{ message.text }}
                                </v-card-text>
                            </div>

                        </v-card>

                    </v-col>

                </v-row>
                <NewMessageForm :dialog="dialog" :followeds="followeds"
                                v-on:close-dialog="closeDialog"></NewMessageForm>
        </v-main>
    </section>
</template>

<script>
    import Navigation from "./navigation/Navigation";
    import MessagesList from "./messages/MessagesList";
    import NewMessageForm from "./messages/NewMessageForm";
    import FollowDataService from "../services/FollowDataService";

    export default {
        name: "Messages",
        components: {
            Navigation,
            MessagesList,
            NewMessageForm
        },
        data: () => ({
            userType: null,
            message: null,
            dialog: false,
            followeds: []
        }),
        mounted() {
            this.userType = localStorage.getItem('userType');

        },
        methods: {
            watchSelectedMessage(message) {
                console.log(message);
                this.message = message;
            },
            watchNewMessageForm() {
                this.retrieveFollowers();
                this.dialog = true;
            },
            closeDialog() {
                this.dialog = false;
            },
            retrieveFollowers() {
                this.followeds = [];
                FollowDataService.getAllBYFollowerId(localStorage.getItem('id'))
                    .then(response => {
                        const resources = response.data;
                        resources.forEach(resource => {
                            let user = {
                                name: resource.firstName + ' ' + resource.lastName,
                                id: resource.userId,
                            }
                            this.followeds.push(user);
                        });
                        console.log('results: ');
                        console.log(resources);
                    })
                    .catch(e => {
                        console.log(e);
                    });


            },
            formatCompat(date) {
                const dateType = new Date(date);
                const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return dateType.getDate() + ' ' + ms[dateType.getMonth()] + ' ' + dateType.getFullYear();
            },
        },


    }
</script>

<style scoped>
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
