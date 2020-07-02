<template>
    <div class="">
        <v-card
                max-width="450"
                class="ml-12"
        >

                    <v-tabs   color="white" background-color="purple" @change="retrieveMessages" >
                        <v-tab @click="tab=true">
                             Received Message
                         </v-tab>
                        <v-tab @click="tab=false">Send Message</v-tab>
                        <v-fab-transition>
                            <v-btn
                                    color="white"
                                    class="ma-2 purple--text"
                                    fab
                                    x-small
                                    absolute
                                    right
                                    @click="$emit('new-message-form')">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-fab-transition>
                    </v-tabs>


            <v-list three-line>
                <div v-for="(message, index) in messages" :key="message.id">

                    <v-list-item
                            @click="watchSelectedMessage(message)"
                    >
                        <v-list-item-avatar color="purple">
                            <span class="white--text">{{ message.sender.substr(0,1) }}</span>
                        </v-list-item-avatar >
                        <v-list-item-content>
                            <v-list-item-title v-text="message.sender"></v-list-item-title>
                            <v-list-item-subtitle v-text="formatCompat(message.sendDate)"></v-list-item-subtitle>
                            <v-list-item-action v-text="message.text.substr(0,10)"></v-list-item-action>

                        </v-list-item-content>

                    </v-list-item>
                    <v-divider v-if="index < messages.length - 1 "
                    ></v-divider>
                </div>
            </v-list>
        </v-card>
    </div>
</template>

<script>
    import MessageDataService from "../../services/MessageDataService";

    export default {
        name: "MessagesList",
        data: () => ({
            messages: [],
            tab: true
        }),
        methods: {
            watchSelectedMessage(message) {
                this.$emit('watch-selected-message', message);
            },
            retrieveMessages() {
                let id = localStorage.getItem('id');
                if (this.tab) {
                    MessageDataService.getAllByAccountId(id)
                        .then(response => {
                            this.messages=response.data;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                else {
                    MessageDataService.getAllBySenderAsync(id)
                        .then(response => {
                            this.messages=response.data;
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }

            },
            formatCompat(date) {
                const dateType = new Date(date);
                const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return dateType.getDate() + ' ' + ms[dateType.getMonth()] + ' ' + dateType.getFullYear();
            },

        },
        mounted() {
            this.retrieveMessages()
        }


    }
</script>

<style scoped>

</style>
